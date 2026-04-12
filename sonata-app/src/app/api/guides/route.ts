import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createErrorResponse, createJsonResponse } from '@/utils/api'

export async function GET() {
  try {
    const guides = await prisma.guide.findMany({
      orderBy: { name: 'asc' },
    })
    return createJsonResponse(guides)
  } catch (error) {
    return createErrorResponse('Failed to fetch guides')
  }
}
