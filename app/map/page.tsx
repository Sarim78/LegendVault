'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { mockLegends } from '@/lib/mock-data'
import { getCategoryColor } from '@/lib/types'
import { cn } from '@/lib/utils'
import { MapPin, ChevronUp, X, List } from 'lucide-react'

const LegendMap = dynamic(() => import('@/components/legend-map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#0a0a0a]">
      <div className="text-sm text-muted-foreground">Loading map...</div>
    </div>
  ),
})

export default function MapPage() {
  const [selectedLegend, setSelectedLegend] = useState<string | null>(null)
  const [showPanel, setShowPanel] = useState(true)

  const handleSelectLegend = useCallback((id: string | null) => {
    setSelectedLegend((current) => (current === id && id !== null ? null : id))
  }, [])

  return (
    <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0">
        <LegendMap
          legends={mockLegends}
          selectedLegendId={selectedLegend}
          onSelectLegend={handleSelectLegend}
        />
      </div>

      <button
        onClick={() => setShowPanel(!showPanel)}
        className="absolute left-4 top-4 z-[1000] flex h-10 w-10 items-center justify-center rounded-lg bg-card/90 backdrop-blur-sm lg:hidden"
      >
        {showPanel ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
      </button>

      <div
        className={cn(
          'absolute left-0 top-0 z-[1000] h-full w-full max-w-md transform transition-transform duration-300 lg:left-4 lg:top-4 lg:h-[calc(100%-32px)] lg:w-96 lg:rounded-xl',
          showPanel
            ? 'translate-x-0'
            : '-translate-x-full lg:-translate-x-[calc(100%+16px)]'
        )}
      >
        <div className="glass-card flex h-full flex-col rounded-none lg:rounded-xl">
          <div className="border-b border-border/40 p-4 pt-16 lg:pt-4">
            <h2 className="font-serif text-xl font-bold text-foreground">
              Nearby Legends
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {mockLegends.length} legends discovered
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-3">
              {mockLegends.map((legend) => {
                const isSelected = selectedLegend === legend.id
                const categoryColor = getCategoryColor(legend.category)

                return (
                  <button
                    key={legend.id}
                    onClick={() => handleSelectLegend(legend.id)}
                    className={cn(
                      'flex flex-col gap-2 rounded-lg border p-4 text-left transition-smooth',
                      isSelected
                        ? 'border-primary/50 bg-primary/10'
                        : 'border-border/40 bg-card/50 hover:border-primary/30 hover:bg-card'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize text-white',
                          categoryColor
                        )}
                      >
                        {legend.category}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-foreground">
                      {legend.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 text-destructive" />
                      <span>{legend.location.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ChevronUp className="h-3 w-3" />
                        {legend.upvotes}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
