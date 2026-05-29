'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { mockLegends } from '@/lib/mock-data'
import { LegendCard } from '@/components/legend-card'
import { Calendar, ScrollText, Ghost } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  // Find the user from mock data
  const userLegends = mockLegends.filter((legend) => legend.author.id === id)
  const user = userLegends[0]?.author

  if (!user) {
    notFound()
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Cover Banner */}
      <div className="noise-overlay relative h-48 overflow-hidden bg-gradient-to-r from-primary/20 via-card to-destructive/10 md:h-64">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-16 flex flex-col items-center md:-mt-20 md:flex-row md:items-end md:gap-6">
          {/* Avatar */}
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.username}
              className="h-32 w-32 rounded-full border-4 border-background bg-card shadow-xl md:h-40 md:w-40"
            />
          </div>

          {/* User Info */}
          <div className="mt-4 flex flex-1 flex-col items-center text-center md:mt-0 md:items-start md:pb-4 md:text-left">
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              {user.username}
            </h1>
            {user.bio && (
              <p className="mt-2 max-w-md text-muted-foreground">{user.bio}</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 border-b border-border/40 pb-8 md:justify-start">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ScrollText className="h-5 w-5" />
            <span className="font-medium text-foreground">{userLegends.length}</span>
            <span>Legends Submitted</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span>Joined</span>
            <span className="font-medium text-foreground">
              {format(new Date(user.joinDate), 'MMMM yyyy')}
            </span>
          </div>
        </div>

        {/* User's Legends */}
        <div className="mt-10">
          <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
            Submitted Legends
          </h2>

          {userLegends.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userLegends.map((legend) => (
                <LegendCard key={legend.id} legend={legend} />
              ))}
            </div>
          ) : (
            <div className="glass-card flex flex-col items-center justify-center rounded-xl py-16 text-center">
              <Ghost className="h-16 w-16 text-muted-foreground/50" />
              <h3 className="mt-6 font-serif text-xl font-bold text-foreground">
                No legends yet
              </h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                This user {"hasn't"} submitted any legends yet.
              </p>
              <Button className="mt-6 bg-primary hover:bg-primary/90" asChild>
                <Link href="/submit">Submit a Legend</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
