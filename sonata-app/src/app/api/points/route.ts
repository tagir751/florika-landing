import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const points = await prisma.point.findMany({
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(points)
  } catch (error) {
    console.error('Error fetching points:', error)
    return NextResponse.json({ error: 'Failed to fetch points' }, { status: 500 })
  }
}
