'use client'

import { MapPin, ChevronUp } from 'lucide-react'
import { getCategoryColor, type Legend } from '@/lib/types'
import { cn } from '@/lib/utils'

interface MapLegendsListProps {
  legends: Legend[]
  selectedLegendId: string | null
  onSelectLegend: (id: string) => void
}

export function MapLegendsList({
  legends,
  selectedLegendId,
  onSelectLegend,
}: MapLegendsListProps) {
  return (
    <div className="flex flex-col gap-3">
      {legends.map((legend) => {
        const isSelected = selectedLegendId === legend.id
        const categoryColor = getCategoryColor(legend.category)

        return (
          <button
            key={legend.id}
            type="button"
            onClick={() => onSelectLegend(legend.id)}
            className={cn(
              'flex min-h-11 flex-col gap-2 rounded-lg border p-4 text-left transition-smooth',
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
            <h3 className="font-serif font-bold text-foreground">{legend.title}</h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0 text-destructive" />
              <span className="break-words">{legend.location.name}</span>
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
  )
}
