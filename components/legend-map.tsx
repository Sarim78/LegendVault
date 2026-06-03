'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './legend-map.css'
import type { Category, Legend } from '@/lib/types'

const TILE_URL =
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

const CATEGORY_COLORS: Record<Category, string> = {
  haunted: '#dc2626',
  cryptid: '#16a34a',
  paranormal: '#7c3aed',
  disappearance: '#ea580c',
  cursed: '#ca8a04',
}

interface LegendMapProps {
  legends: Legend[]
  selectedLegendId: string | null
  onSelectLegend: (id: string | null) => void
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function isTouchDevice() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 1023px)').matches
}

function createGlowingIcon(color: string, selected: boolean) {
  const touch = isTouchDevice()
  const size = selected ? (touch ? 52 : 48) : touch ? 44 : 36

  return L.divIcon({
    className: 'legend-marker-icon',
    html: `
      <div class="legend-pin ${selected ? 'legend-pin--selected' : ''} ${touch ? 'legend-pin--touch' : ''}" style="--pin-color: ${color}">
        <span class="legend-pin__glow"></span>
        <span class="legend-pin__ring"></span>
        <span class="legend-pin__dot"></span>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}

function buildPopupHtml(legend: Legend): string {
  const color = CATEGORY_COLORS[legend.category]

  return `
    <div class="legend-popup">
      <span class="legend-popup__badge" style="background-color: ${color}">${legend.category}</span>
      <h3 class="legend-popup__title">${escapeHtml(legend.title)}</h3>
      <p class="legend-popup__location">${escapeHtml(legend.location.name)}</p>
      <p class="legend-popup__upvotes">${legend.upvotes} upvotes</p>
      <a href="/legend/${legend.id}" class="legend-popup__link">Read Full Legend &rarr;</a>
    </div>
  `
}

export default function LegendMap({
  legends,
  selectedLegendId,
  onSelectLegend,
}: LegendMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())
  const onSelectLegendRef = useRef(onSelectLegend)

  onSelectLegendRef.current = onSelectLegend

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: [39.8, -98.5],
      zoom: 4,
      zoomControl: false,
      tap: true,
      tapTolerance: 20,
    })

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    L.tileLayer(TILE_URL, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map)

    mapRef.current = map

    if (legends.length > 0) {
      const bounds = L.latLngBounds(
        legends.map(
          (legend) =>
            [legend.location.lat, legend.location.lng] as [number, number]
        )
      )
      map.fitBounds(bounds, { padding: [50, 50] })
    }

    legends.forEach((legend) => {
      const color = CATEGORY_COLORS[legend.category]
      const marker = L.marker([legend.location.lat, legend.location.lng], {
        icon: createGlowingIcon(color, false),
        keyboard: true,
        riseOnHover: true,
      })

      marker.bindPopup(buildPopupHtml(legend), {
        className: 'legend-leaflet-popup',
        maxWidth: 280,
        minWidth: 220,
        autoPan: true,
        autoPanPadding: [80, 80],
        closeOnClick: false,
      })

      const selectLegend = () => {
        onSelectLegendRef.current(legend.id)
      }

      marker.on('click', selectLegend)

      marker.addTo(map)
      markersRef.current.set(legend.id, marker)
    })

    const invalidate = () => {
      map.invalidateSize({ animate: false })
    }

    map.whenReady(invalidate)
    const t1 = window.setTimeout(invalidate, 100)
    const t2 = window.setTimeout(invalidate, 500)

    window.addEventListener('resize', invalidate)
    window.addEventListener('orientationchange', invalidate)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.removeEventListener('resize', invalidate)
      window.removeEventListener('orientationchange', invalidate)
      map.remove()
      mapRef.current = null
      markersRef.current.clear()
    }
  }, [legends])

  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const legend = legends.find((l) => l.id === id)
      if (!legend) return

      const color = CATEGORY_COLORS[legend.category]
      marker.setIcon(createGlowingIcon(color, id === selectedLegendId))
    })
  }, [selectedLegendId, legends])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    if (!selectedLegendId) {
      map.closePopup()
      return
    }

    const marker = markersRef.current.get(selectedLegendId)
    if (marker) {
      map.panTo(marker.getLatLng(), { animate: true })
      marker.openPopup()
    }
  }, [selectedLegendId])

  return (
    <div ref={containerRef} className="legend-map-container h-full w-full min-h-0" />
  )
}
