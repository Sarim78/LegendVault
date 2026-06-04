import {
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb'
import { docClient, TABLES } from '@/lib/dynamodb'
import type { Category, Comment, Legend } from '@/lib/types'

export interface DbLegend {
  legendId: string
  createdAt: string
  title: string
  story: string
  authorId: string
  location: { name: string; lat: number; lng: number }
  category: Category
  upvotes: number
  commentCount: number
}

export interface DbUser {
  userId: string
  username: string
  email?: string
  bio?: string
  avatarUrl?: string
  legendsSubmitted?: number
  joinedAt?: string
}

export interface DbComment {
  legendId: string
  commentId: string
  authorId: string
  authorName: string
  content: string
  createdAt: string
}

const DEFAULT_USER: DbUser = {
  userId: 'guest',
  username: 'Anonymous',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
  legendsSubmitted: 0,
  joinedAt: new Date().toISOString(),
}

function excerptFromStory(story: string): string {
  const trimmed = story.trim()
  if (trimmed.length <= 120) return trimmed
  return `${trimmed.slice(0, 120)}...`
}

export function mapUserToAuthor(user: DbUser) {
  return {
    id: user.userId,
    username: user.username,
    avatar: user.avatarUrl ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.userId}`,
    joinDate: user.joinedAt ?? new Date().toISOString(),
    bio: user.bio,
    legendsCount: user.legendsSubmitted ?? 0,
  }
}

export async function getUser(userId: string): Promise<DbUser> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TABLES.users,
      Key: { userId },
    })
  )
  return (result.Item as DbUser | undefined) ?? { ...DEFAULT_USER, userId }
}

export async function getUsersByIds(userIds: string[]): Promise<Map<string, DbUser>> {
  const unique = [...new Set(userIds)]
  const users = new Map<string, DbUser>()
  await Promise.all(
    unique.map(async (userId) => {
      users.set(userId, await getUser(userId))
    })
  )
  return users
}

export function mapDbLegendToLegend(item: DbLegend, author: DbUser): Legend {
  return {
    id: item.legendId,
    title: item.title,
    excerpt: excerptFromStory(item.story),
    content: item.story,
    category: item.category,
    location: item.location,
    upvotes: item.upvotes ?? 0,
    commentCount: item.commentCount ?? 0,
    author: mapUserToAuthor(author),
    createdAt: item.createdAt,
  }
}

export async function scanAllLegends(): Promise<Legend[]> {
  const result = await docClient.send(
    new ScanCommand({ TableName: TABLES.legends })
  )
  const items = (result.Items ?? []) as DbLegend[]
  const userIds = items.map((item) => item.authorId)
  const users = await getUsersByIds(userIds)
  return items.map((item) =>
    mapDbLegendToLegend(item, users.get(item.authorId) ?? { ...DEFAULT_USER, userId: item.authorId })
  )
}

export async function getLegendById(legendId: string): Promise<Legend | null> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TABLES.legends,
      KeyConditionExpression: 'legendId = :legendId',
      ExpressionAttributeValues: { ':legendId': legendId },
      Limit: 1,
    })
  )
  const item = (result.Items?.[0] as DbLegend | undefined) ?? null
  if (!item) return null
  const author = await getUser(item.authorId)
  return mapDbLegendToLegend(item, author)
}

export async function getDbLegendById(legendId: string): Promise<DbLegend | null> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TABLES.legends,
      KeyConditionExpression: 'legendId = :legendId',
      ExpressionAttributeValues: { ':legendId': legendId },
      Limit: 1,
    })
  )
  return (result.Items?.[0] as DbLegend | undefined) ?? null
}

export async function createLegend(input: {
  title: string
  story: string
  category: Category
  location: { name: string; lat: number; lng: number }
  authorId?: string
}): Promise<Legend> {
  const legendId = crypto.randomUUID()
  const createdAt = new Date().toISOString()
  const authorId = input.authorId ?? 'guest'

  const item: DbLegend = {
    legendId,
    createdAt,
    title: input.title,
    story: input.story,
    authorId,
    location: input.location,
    category: input.category,
    upvotes: 0,
    commentCount: 0,
  }

  await docClient.send(
    new PutCommand({
      TableName: TABLES.legends,
      Item: item,
    })
  )

  const author = await getUser(authorId)
  return mapDbLegendToLegend(item, author)
}

export async function incrementLegendUpvotes(legendId: string): Promise<number | null> {
  const legend = await getDbLegendById(legendId)
  if (!legend) return null

  const result = await docClient.send(
    new UpdateCommand({
      TableName: TABLES.legends,
      Key: { legendId: legend.legendId, createdAt: legend.createdAt },
      UpdateExpression: 'ADD upvotes :inc',
      ExpressionAttributeValues: { ':inc': 1 },
      ReturnValues: 'ALL_NEW',
    })
  )

  return (result.Attributes as DbLegend).upvotes
}

export async function recordVote(userId: string, legendId: string): Promise<void> {
  await docClient.send(
    new PutCommand({
      TableName: TABLES.votes,
      Item: {
        userId,
        legendId,
        createdAt: new Date().toISOString(),
      },
    })
  )
}

export async function getCommentsForLegend(legendId: string): Promise<Comment[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TABLES.comments,
      KeyConditionExpression: 'legendId = :legendId',
      ExpressionAttributeValues: { ':legendId': legendId },
    })
  )

  const items = (result.Items ?? []) as DbComment[]
  const userIds = items.map((c) => c.authorId)
  const users = await getUsersByIds(userIds)

  return items
    .map((item) => {
      const user = users.get(item.authorId)
      return {
        id: item.commentId,
        content: item.content,
        author: {
          id: item.authorId,
          username: item.authorName || user?.username || 'Anonymous',
          avatar:
            user?.avatarUrl ??
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.authorId}`,
        },
        createdAt: item.createdAt,
      }
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function createComment(input: {
  legendId: string
  content: string
  authorId?: string
  authorName?: string
}): Promise<Comment> {
  const legend = await getDbLegendById(input.legendId)
  if (!legend) {
    throw new Error('Legend not found')
  }

  const commentId = crypto.randomUUID()
  const createdAt = new Date().toISOString()
  const authorId = input.authorId ?? 'guest'
  const author = await getUser(authorId)
  const authorName = input.authorName ?? author.username

  await docClient.send(
    new PutCommand({
      TableName: TABLES.comments,
      Item: {
        legendId: input.legendId,
        commentId,
        authorId,
        authorName,
        content: input.content,
        createdAt,
      },
    })
  )

  await docClient.send(
    new UpdateCommand({
      TableName: TABLES.legends,
      Key: { legendId: legend.legendId, createdAt: legend.createdAt },
      UpdateExpression: 'ADD commentCount :inc',
      ExpressionAttributeValues: { ':inc': 1 },
    })
  )

  return {
    id: commentId,
    content: input.content,
    author: {
      id: authorId,
      username: authorName,
      avatar:
        author.avatarUrl ??
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorId}`,
    },
    createdAt,
  }
}
