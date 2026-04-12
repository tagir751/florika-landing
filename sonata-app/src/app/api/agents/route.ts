import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createErrorResponse, createJsonResponse } from '@/utils/api'

export async function GET() {
  try {
    const agents = await prisma.agent.findMany({
      orderBy: { name: 'asc' },
    })
    return createJsonResponse(agents)
  } catch (error) {
    return createErrorResponse('Failed to fetch agents')
  }
}
