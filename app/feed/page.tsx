'use client'

import { useState, useMemo } from 'react'
import { LegendCard } from '@/components/legend-card'
import { LegendCardSkeleton } from '@/components/legend-card-skeleton'
import { mockLegends } from '@/lib/mock-data'
import { Category, CATEGORIES } from '@/lib/types'
import { cn } from '@/lib/utils'
import { SlidersHorizontal, Ghost } from 'lucide-react'
import { Button } from '@/components/ui/button'

type SortOption = 'newest' | 'upvoted'

export default function FeedPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [showFilters, setShowFilters] = useState(false)

  const filteredAndSortedLegends = useMemo(() => {
    let legends = [...mockLegends]

    // Filter by category
    if (selectedCategory !== 'all') {
      legends = legends.filter((legend) => legend.category === selectedCategory)
    }

    // Sort
    if (sortBy === 'newest') {
      legends.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else {
      legends.sort((a, b) => b.upvotes - a.upvotes)
    }

    return legends
  }, [selectedCategory, sortBy])

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Explore Legends
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover stories from the shadows, one location at a time
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="min-h-11 border-border/60"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSortBy('newest')}
                className={cn(
                  'min-h-11 rounded-lg px-3 py-2 text-sm font-medium transition-smooth',
                  sortBy === 'newest'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Newest
              </button>
              <button
                type="button"
                onClick={() => setSortBy('upvoted')}
                className={cn(
                  'min-h-11 rounded-lg px-3 py-2 text-sm font-medium transition-smooth',
                  sortBy === 'upvoted'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Most Upvoted
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside
            className={cn(
              'w-full shrink-0 lg:block lg:w-64',
              showFilters ? 'block' : 'hidden'
            )}
          >
            <div className="glass-card sticky top-24 rounded-xl p-6">
              {/* Categories */}
              <div className="mb-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Categories
                </h3>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={cn(
                      'flex min-h-11 items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-smooth',
                      selectedCategory === 'all'
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <span>All Legends</span>
                    <span className="text-xs">{mockLegends.length}</span>
                  </button>
                  {CATEGORIES.map((category) => {
                    const count = mockLegends.filter(
                      (l) => l.category === category.value
                    ).length
                    return (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => setSelectedCategory(category.value)}
                        className={cn(
                          'flex min-h-11 items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-smooth',
                          selectedCategory === category.value
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn('h-2 w-2 rounded-full', category.color)}
                          />
                          <span>{category.label}</span>
                        </div>
                        <span className="text-xs">{count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Sort - Desktop Only */}
              <div className="hidden lg:block">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Sort By
                </h3>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setSortBy('newest')}
                    className={cn(
                      'min-h-11 rounded-lg px-3 py-2 text-left text-sm font-medium transition-smooth',
                      sortBy === 'newest'
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    Newest First
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortBy('upvoted')}
                    className={cn(
                      'min-h-11 rounded-lg px-3 py-2 text-left text-sm font-medium transition-smooth',
                      sortBy === 'upvoted'
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    Most Upvoted
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {filteredAndSortedLegends.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredAndSortedLegends.map((legend) => (
                  <LegendCard key={legend.id} legend={legend} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="glass-card flex flex-col items-center justify-center rounded-xl py-20 text-center">
                <Ghost className="h-16 w-16 text-muted-foreground/50" />
                <h3 className="mt-6 font-serif text-xl font-bold text-foreground">
                  No legends found
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  There are no legends in this category yet. Be the first to share one!
                </p>
                <Button className="mt-6 bg-primary hover:bg-primary/90" asChild>
                  <a href="/submit">Submit a Legend</a>
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
