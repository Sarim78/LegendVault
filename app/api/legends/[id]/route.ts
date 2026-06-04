import { NextResponse } from 'next/server'
import { getLegendById } from '@/lib/legend-db'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const legend = await getLegendById(id)

    if (!legend) {
      return NextResponse.json({ error: 'Legend not found' }, { status: 404 })
    }

    return NextResponse.json(legend)
  } catch (error) {
    console.error('GET /api/legends/[id]:', error)
    return NextResponse.json({ error: 'Failed to fetch legend' }, { status: 500 })
  }
}
