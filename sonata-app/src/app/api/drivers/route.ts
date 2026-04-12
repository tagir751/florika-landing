import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createErrorResponse, createJsonResponse } from '@/utils/api'

export async function GET() {
  try {
    const drivers = await prisma.driver.findMany({
      orderBy: { name: 'asc' },
    })
    return createJsonResponse(drivers)
  } catch (error) {
    return createErrorResponse('Failed to fetch drivers')
  }
}
