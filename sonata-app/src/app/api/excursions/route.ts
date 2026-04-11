import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const excursions = await prisma.excursion.findMany({
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(excursions)
  } catch (error) {
    console.error('Error fetching excursions:', error)
    return NextResponse.json({ error: 'Failed to fetch excursions' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, price, duration } = body

    const excursion = await prisma.excursion.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        duration,
      },
    })

    return NextResponse.json(excursion)
  } catch (error) {
    console.error('Error creating excursion:', error)
    return NextResponse.json({ error: 'Failed to create excursion' }, { status: 500 })
  }
}
