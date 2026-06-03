'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDistanceToNow, format } from 'date-fns'
import { mockLegends, mockComments } from '@/lib/mock-data'
import { getCategoryColor } from '@/lib/types'
import { cn } from '@/lib/utils'
import { MapPin, ChevronUp, Calendar, MessageCircle, Send, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LegendPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [upvoted, setUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(0)
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState(mockComments)

  const legend = mockLegends.find((l) => l.id === id)

  if (!legend) {
    notFound()
  }

  // Initialize upvote count
  if (upvoteCount === 0 && legend) {
    setUpvoteCount(legend.upvotes)
  }

  const handleUpvote = () => {
    if (upvoted) {
      setUpvoteCount((prev) => prev - 1)
    } else {
      setUpvoteCount((prev) => prev + 1)
    }
    setUpvoted(!upvoted)
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment = {
      id: `c${Date.now()}`,
      content: newComment,
      author: {
        id: 'current-user',
        username: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
      },
      createdAt: new Date().toISOString(),
    }

    setComments([comment, ...comments])
    setNewComment('')
  }

  const categoryColor = getCategoryColor(legend.category)

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header */}
      <header className="noise-overlay relative overflow-hidden border-b border-border/40 bg-card/30 py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4">
          {/* Back Button */}
          <Link
            href="/feed"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-smooth hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Explore
          </Link>

          {/* Category Badge */}
          <span
            className={cn(
              'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium capitalize text-white',
              categoryColor
            )}
          >
            {legend.category}
          </span>

          {/* Title */}
          <h1 className="mt-4 max-w-3xl font-serif text-2xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            {legend.title}
          </h1>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-destructive" />
              <span>{legend.location.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(legend.createdAt), 'MMMM d, yyyy')}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Main Content */}
          <article className="flex-1">
            {/* Story Content */}
            <div className="prose prose-invert max-w-none">
              {legend.content.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-6 text-base leading-relaxed text-foreground/90 md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Upvote Button */}
            <div className="mt-12 flex items-center gap-4 border-t border-border/40 pt-8">
              <Button
                size="lg"
                variant={upvoted ? 'default' : 'outline'}
                className={cn(
                  'min-h-11 gap-2 transition-smooth',
                  upvoted
                    ? 'bg-primary hover:bg-primary/90'
                    : 'border-border/60 hover:border-primary/50 hover:bg-primary/10'
                )}
                onClick={handleUpvote}
              >
                <ChevronUp className={cn('h-5 w-5', upvoted && 'animate-bounce')} />
                <span>{upvoteCount}</span>
                <span className="hidden sm:inline">Upvotes</span>
              </Button>
              <span className="text-sm text-muted-foreground">
                {upvoted ? 'You upvoted this legend' : 'Found this legend interesting?'}
              </span>
            </div>

            {/* Comments Section */}
            <section className="mt-12 border-t border-border/40 pt-8">
              <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-foreground">
                <MessageCircle className="h-6 w-6" />
                Comments
                <span className="text-lg text-muted-foreground">({comments.length})</span>
              </h2>

              {/* Comment Form */}
              <form onSubmit={handleSubmitComment} className="mt-6">
                <div className="glass-card overflow-hidden rounded-xl">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts or experiences..."
                    className="min-h-11 w-full resize-none bg-transparent px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
                    rows={3}
                  />
                  <div className="flex items-center justify-end border-t border-border/40 px-4 py-3">
                    <Button
                      type="submit"
                      className="min-h-11 bg-primary hover:bg-primary/90"
                      disabled={!newComment.trim()}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Post Comment
                    </Button>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="mt-8 flex flex-col gap-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="glass-card rounded-xl p-5"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.username}
                        className="h-10 w-10 rounded-full bg-muted"
                      />
                      <div>
                        <span className="font-medium text-foreground">
                          {comment.author.username}
                        </span>
                        <time className="ml-2 text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt), {
                            addSuffix: true,
                          })}
                        </time>
                      </div>
                    </div>
                    <p className="mt-3 text-foreground/90">{comment.content}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-80">
            {/* Author Card */}
            <div className="glass-card sticky top-24 rounded-xl p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Submitted By
              </h3>
              <div className="flex items-center gap-4">
                <img
                  src={legend.author.avatar}
                  alt={legend.author.username}
                  className="h-14 w-14 rounded-full bg-muted"
                />
                <div>
                  <Link
                    href={`/profile/${legend.author.id}`}
                    className="font-serif text-lg font-bold text-foreground transition-smooth hover:text-primary"
                  >
                    {legend.author.username}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    Joined {format(new Date(legend.author.joinDate), 'MMMM yyyy')}
                  </p>
                </div>
              </div>
              {legend.author.bio && (
                <p className="mt-4 text-sm text-muted-foreground">
                  {legend.author.bio}
                </p>
              )}
              <div className="mt-4 border-t border-border/40 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Legends Submitted</span>
                  <span className="font-medium text-foreground">
                    {legend.author.legendsCount}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full border-border/60 hover:border-primary/50 hover:bg-primary/10"
                asChild
              >
                <Link href={`/profile/${legend.author.id}`}>View Profile</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
