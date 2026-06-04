import { NextResponse } from 'next/server'
import { createLegend, scanAllLegends } from '@/lib/legend-db'
import type { Category } from '@/lib/types'

export async function GET() {
  try {
    const legends = await scanAllLegends()
    return NextResponse.json(legends)
  } catch (error) {
    console.error('GET /api/legends:', error)
    return NextResponse.json({ error: 'Failed to fetch legends' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, story, category, location, authorId } = body

    if (!title?.trim() || !story?.trim() || !category || !location) {
      return NextResponse.json(
        { error: 'title, story, category, and location are required' },
        { status: 400 }
      )
    }

    const locationData =
      typeof location === 'string'
        ? { name: location, lat: 0, lng: 0 }
        : {
            name: location.name ?? '',
            lat: location.lat ?? 0,
            lng: location.lng ?? 0,
          }

    const legend = await createLegend({
      title: title.trim(),
      story: story.trim(),
      category: category as Category,
      location: locationData,
      authorId,
    })

    return NextResponse.json(legend, { status: 201 })
  } catch (error) {
    console.error('POST /api/legends:', error)
    return NextResponse.json({ error: 'Failed to create legend' }, { status: 500 })
  }
}
