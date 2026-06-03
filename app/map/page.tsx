'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { mockLegends } from '@/lib/mock-data'
import { List } from 'lucide-react'
import { MapLegendsList } from '@/components/map-legends-list'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'

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
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleSelectLegend = useCallback((id: string | null) => {
    setSelectedLegend((current) => (current === id && id !== null ? null : id))
  }, [])

  const handleListSelect = useCallback(
    (id: string) => {
      handleSelectLegend(id)
      setDrawerOpen(false)
    },
    [handleSelectLegend]
  )

  return (
    <div className="relative h-[calc(100dvh-4rem)] w-full overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0">
        <LegendMap
          legends={mockLegends}
          selectedLegendId={selectedLegend}
          onSelectLegend={handleSelectLegend}
        />
      </div>

      {/* Desktop sidebar */}
      <div className="absolute left-4 top-4 z-[1000] hidden h-[calc(100%-2rem)] w-96 lg:block">
        <div className="glass-card flex h-full flex-col rounded-xl">
          <div className="border-b border-border/40 p-4">
            <h2 className="font-serif text-xl font-bold text-foreground">
              Nearby Legends
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {mockLegends.length} legends discovered
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <MapLegendsList
              legends={mockLegends}
              selectedLegendId={selectedLegend}
              onSelectLegend={handleListSelect}
            />
          </div>
        </div>
      </div>

      {/* Mobile bottom drawer trigger */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        className="absolute bottom-4 left-1/2 z-[1000] flex min-h-11 -translate-x-1/2 items-center gap-2 rounded-full border border-border/40 bg-card/95 px-5 py-2.5 text-sm font-medium text-foreground shadow-lg backdrop-blur-sm lg:hidden"
        aria-label="Open nearby legends list"
      >
        <List className="h-5 w-5" />
        Nearby Legends ({mockLegends.length})
      </button>

      {/* Mobile bottom drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="bottom">
        <DrawerContent className="glass-card z-[1001] max-h-[85dvh] border-border/40 bg-card/95">
          <DrawerHeader className="border-b border-border/40 pb-4 text-left">
            <DrawerTitle className="font-serif text-xl font-bold">
              Nearby Legends
            </DrawerTitle>
            <DrawerDescription>
              {mockLegends.length} legends discovered
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-6 pt-2">
            <MapLegendsList
              legends={mockLegends}
              selectedLegendId={selectedLegend}
              onSelectLegend={handleListSelect}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
