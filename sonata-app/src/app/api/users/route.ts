import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/utils/auth'
import { createErrorResponse, createJsonResponse } from '@/utils/api'

export async function GET() {
  try {
    const auth = await requireAuth(['OWNER'])
    if (!auth.authorized) {
      return auth.response!
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    return createJsonResponse(users)
  } catch (error) {
    return createErrorResponse('Failed to fetch users')
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(['OWNER'])
    if (!auth.authorized) {
      return auth.response!
    }

    const body = await request.json()
    const { email, password, name, role } = body

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return createErrorResponse('User already exists', 400)
    }

    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
        role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    return createJsonResponse(user)
  } catch (error) {
    return createErrorResponse('Failed to create user')
  }
}

export async function DELETE(request: Request) {
  try {
    const auth = await requireAuth(['OWNER'])
    if (!auth.authorized) {
      return auth.response!
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')

    if (!userId) {
      return createErrorResponse('User ID required', 400)
    }

    await prisma.user.delete({
      where: { id: userId },
    })

    return createJsonResponse({ success: true })
  } catch (error) {
    return createErrorResponse('Failed to delete user')
  }
}
