import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user
}

export async function requireAuth(requiredRoles?: string[]) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return { 
      authorized: false, 
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) 
    }
  }

  if (requiredRoles && requiredRoles.length > 0) {
    if (!requiredRoles.includes(session.user.role)) {
      return { 
        authorized: false, 
        response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) 
      }
    }
  }

  return { 
    authorized: true, 
    user: session.user,
    response: null 
  }
}

export function getRoleDisplayName(role: string): string {
  const roleMap: Record<string, string> = {
    'SELLER': 'Продавец',
    'MANAGER': 'Менеджер',
    'OWNER': 'Собственник',
  }
  return roleMap[role] || role
}
