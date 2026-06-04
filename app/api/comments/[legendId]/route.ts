import { NextResponse } from 'next/server'
import { createComment, getCommentsForLegend } from '@/lib/legend-db'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ legendId: string }> }
) {
  try {
    const { legendId } = await params
    const comments = await getCommentsForLegend(legendId)
    return NextResponse.json(comments)
  } catch (error) {
    console.error('GET /api/comments/[legendId]:', error)
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ legendId: string }> }
) {
  try {
    const { legendId } = await params
    const body = await request.json()
    const { content, authorId, authorName } = body

    if (!content?.trim()) {
      return NextResponse.json({ error: 'content is required' }, { status: 400 })
    }

    const comment = await createComment({
      legendId,
      content: content.trim(),
      authorId,
      authorName,
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('POST /api/comments/[legendId]:', error)
    const message = error instanceof Error ? error.message : 'Failed to create comment'
    const status = message === 'Legend not found' ? 404 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
