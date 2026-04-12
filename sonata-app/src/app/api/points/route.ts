import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createErrorResponse, createJsonResponse } from '@/utils/api'

export async function GET() {
  try {
    const points = await prisma.point.findMany({
      orderBy: { name: 'asc' },
    })
    return createJsonResponse(points)
  } catch (error) {
    return createErrorResponse('Failed to fetch points')
  }
}
