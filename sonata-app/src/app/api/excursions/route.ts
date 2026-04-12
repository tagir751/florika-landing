import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createErrorResponse, createJsonResponse, validateRequiredFields } from '@/utils/api'

export async function GET() {
  try {
    const excursions = await prisma.excursion.findMany({
      orderBy: { name: 'asc' },
    })
    return createJsonResponse(excursions)
  } catch (error) {
    return createErrorResponse('Failed to fetch excursions')
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const validationError = validateRequiredFields(body, ['name', 'price'])
    if (validationError) {
      return createErrorResponse(validationError, 400)
    }

    const { name, description, price, duration } = body

    const excursion = await prisma.excursion.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        duration,
      },
    })

    return createJsonResponse(excursion)
  } catch (error) {
    return createErrorResponse('Failed to create excursion')
  }
}
