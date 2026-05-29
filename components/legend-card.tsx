'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { MapPin, ChevronUp, MessageCircle } from 'lucide-react'
import { Legend, getCategoryColor } from '@/lib/types'
import { cn } from '@/lib/utils'

interface LegendCardProps {
  legend: Legend
  variant?: 'default' | 'compact'
}

export function LegendCard({ legend, variant = 'default' }: LegendCardProps) {
  const categoryColor = getCategoryColor(legend.category)

  return (
    <Link href={`/legend/${legend.id}`}>
      <article
        className={cn(
          'glass-card group relative flex flex-col overflow-hidden rounded-xl transition-smooth hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
          variant === 'compact' ? 'min-w-[300px] max-w-[300px]' : 'w-full'
        )}
      >
        <div className="flex flex-col gap-4 p-5">
          {/* Category Badge */}
          <div className="flex items-center justify-between">
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize text-white',
                categoryColor
              )}
            >
              {legend.category}
            </span>
            <time className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(legend.createdAt), { addSuffix: true })}
            </time>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold leading-tight text-foreground transition-smooth group-hover:text-primary">
            {legend.title}
          </h3>

          {/* Excerpt */}
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {legend.excerpt}
          </p>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-destructive" />
            <span>{legend.location.name}</span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border/50 pt-4">
            {/* Author */}
            <div className="flex items-center gap-2">
              <img
                src={legend.author.avatar}
                alt={legend.author.username}
                className="h-6 w-6 rounded-full bg-muted"
              />
              <span className="text-sm text-muted-foreground">
                {legend.author.username}
              </span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-1 text-sm text-muted-foreground transition-smooth hover:text-primary"
                onClick={(e) => e.preventDefault()}
              >
                <ChevronUp className="h-4 w-4" />
                <span>{legend.upvotes}</span>
              </button>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span>{legend.commentCount}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
