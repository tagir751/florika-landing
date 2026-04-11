import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const pickups = await prisma.pickup.findMany({
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(pickups)
  } catch (error) {
    console.error('Error fetching pickups:', error)
    return NextResponse.json({ error: 'Failed to fetch pickups' }, { status: 500 })
  }
}
