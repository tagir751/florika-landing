export interface User {
  id: string
  email: string
  name: string
  role: 'SELLER' | 'MANAGER' | 'OWNER'
  createdAt: Date
}

export interface SessionUser {
  id: string
  email: string
  name: string
  role: string
}

export interface Excursion {
  id: string
  name: string
  description: string
  price: number
  duration?: string
  active?: boolean
  createdAt?: Date
}

export interface Driver {
  id: string
  name: string
  phone?: string
  carModel?: string
  carNumber?: string
  active?: boolean
}

export interface Guide {
  id: string
  name: string
  phone?: string
  languages?: string[]
  active?: boolean
}

export interface Pickup {
  id: string
  name: string
  address?: string
  latitude?: number
  longitude?: number
  active?: boolean
}

export interface Point {
  id: string
  name: string
  address?: string
  agentId?: string
  active?: boolean
}

export interface Agent {
  id: string
  name: string
  contactPerson?: string
  phone?: string
  email?: string
  commission?: number
  active?: boolean
}
