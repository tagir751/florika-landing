import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createErrorResponse, createJsonResponse } from '@/utils/api'

export async function GET() {
  try {
    const pickups = await prisma.pickup.findMany({
      orderBy: { name: 'asc' },
    })
    return createJsonResponse(pickups)
  } catch (error) {
    return createErrorResponse('Failed to fetch pickups')
  }
}
