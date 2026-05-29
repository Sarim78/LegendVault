'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { mockLegends } from '@/lib/mock-data'
import { getCategoryColor } from '@/lib/types'
import { cn } from '@/lib/utils'
import { MapPin, ChevronUp, ChevronRight, X, List } from 'lucide-react'
import { Button } from '@/components/ui/button'

// US Map SVG data (simplified state paths)
const US_BOUNDS = { minLng: -125, maxLng: -66, minLat: 24, maxLat: 50 }

function projectCoordinates(lat: number, lng: number, width: number, height: number) {
  const x = ((lng - US_BOUNDS.minLng) / (US_BOUNDS.maxLng - US_BOUNDS.minLng)) * width
  const y = ((US_BOUNDS.maxLat - lat) / (US_BOUNDS.maxLat - US_BOUNDS.minLat)) * height
  return { x, y }
}

export default function MapPage() {
  const [selectedLegend, setSelectedLegend] = useState<string | null>(null)
  const [showPanel, setShowPanel] = useState(true)

  const selectedLegendData = useMemo(() => {
    if (!selectedLegend) return null
    return mockLegends.find((l) => l.id === selectedLegend)
  }, [selectedLegend])

  return (
    <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden bg-[#0a0a0a]">
      {/* Map Container */}
      <div className="absolute inset-0">
        {/* Dark styled map background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] to-[#0a0a0a]">
          {/* Grid overlay for map feel */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* SVG Map Container */}
          <svg
            viewBox="0 0 1000 600"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* US Outline (simplified) */}
            <path
              d="M150,200 L180,180 L220,175 L280,170 L350,165 L400,160 L450,155 L500,150 L550,145 L600,150 L650,155 L700,160 L750,170 L800,180 L850,200 L870,250 L880,300 L870,350 L850,400 L800,430 L750,450 L700,460 L650,455 L600,440 L550,430 L500,420 L450,415 L400,420 L350,430 L300,440 L250,450 L200,440 L160,400 L140,350 L130,300 L140,250 Z"
              fill="rgba(31, 31, 31, 0.5)"
              stroke="rgba(124, 58, 237, 0.3)"
              strokeWidth="2"
            />

            {/* Legend Pins */}
            {mockLegends.map((legend) => {
              const { x, y } = projectCoordinates(
                legend.location.lat,
                legend.location.lng,
                1000,
                600
              )
              const isSelected = selectedLegend === legend.id
              const categoryColor = legend.category === 'haunted' ? '#dc2626' :
                legend.category === 'cryptid' ? '#16a34a' :
                legend.category === 'paranormal' ? '#7c3aed' :
                legend.category === 'disappearance' ? '#0891b2' : '#ea580c'

              return (
                <g
                  key={legend.id}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => setSelectedLegend(isSelected ? null : legend.id)}
                >
                  {/* Glow effect */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 30 : 20}
                    fill={categoryColor}
                    opacity={isSelected ? 0.3 : 0.15}
                    className="animate-pulse"
                  />
                  {/* Outer ring */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 12 : 8}
                    fill="none"
                    stroke={categoryColor}
                    strokeWidth="2"
                    opacity={0.6}
                  />
                  {/* Inner dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 6 : 4}
                    fill={categoryColor}
                  />
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* Toggle Panel Button (Mobile) */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="absolute left-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-lg bg-card/90 backdrop-blur-sm lg:hidden"
      >
        {showPanel ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
      </button>

      {/* Floating Panel */}
      <div
        className={cn(
          'absolute left-0 top-0 z-10 h-full w-full max-w-md transform transition-transform duration-300 lg:left-4 lg:top-4 lg:h-[calc(100%-32px)] lg:w-96 lg:rounded-xl',
          showPanel ? 'translate-x-0' : '-translate-x-full lg:-translate-x-[calc(100%+16px)]'
        )}
      >
        <div className="glass-card flex h-full flex-col rounded-none lg:rounded-xl">
          {/* Panel Header */}
          <div className="border-b border-border/40 p-4 pt-16 lg:pt-4">
            <h2 className="font-serif text-xl font-bold text-foreground">
              Nearby Legends
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {mockLegends.length} legends discovered
            </p>
          </div>

          {/* Legend List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-3">
              {mockLegends.map((legend) => {
                const isSelected = selectedLegend === legend.id
                const categoryColor = getCategoryColor(legend.category)

                return (
                  <button
                    key={legend.id}
                    onClick={() => setSelectedLegend(isSelected ? null : legend.id)}
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

      {/* Selected Legend Popup */}
      {selectedLegendData && (
        <div className="absolute bottom-4 left-1/2 z-20 w-[calc(100%-32px)] max-w-md -translate-x-1/2 lg:bottom-4 lg:left-auto lg:right-4 lg:translate-x-0">
          <div className="glass-card overflow-hidden rounded-xl">
            <div className="p-5">
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize text-white',
                    getCategoryColor(selectedLegendData.category)
                  )}
                >
                  {selectedLegendData.category}
                </span>
                <button
                  onClick={() => setSelectedLegend(null)}
                  className="rounded-lg p-1 text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <h3 className="mt-3 font-serif text-lg font-bold text-foreground">
                {selectedLegendData.title}
              </h3>
              <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-destructive" />
                <span>{selectedLegendData.location.name}</span>
              </div>
              <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ChevronUp className="h-4 w-4" />
                  {selectedLegendData.upvotes} upvotes
                </span>
              </div>
              <Button
                className="mt-4 w-full bg-primary hover:bg-primary/90"
                asChild
              >
                <Link href={`/legend/${selectedLegendData.id}`}>
                  Read Full Legend
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
