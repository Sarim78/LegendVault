import { NextResponse } from 'next/server'
import { incrementLegendUpvotes, recordVote } from '@/lib/legend-db'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json().catch(() => ({}))
    const userId = (body as { userId?: string }).userId ?? 'guest'

    const upvotes = await incrementLegendUpvotes(id)

    if (upvotes === null) {
      return NextResponse.json({ error: 'Legend not found' }, { status: 404 })
    }

    await recordVote(userId, id)

    return NextResponse.json({ legendId: id, upvotes })
  } catch (error) {
    console.error('POST /api/legends/[id]/vote:', error)
    return NextResponse.json({ error: 'Failed to upvote legend' }, { status: 500 })
  }
}
