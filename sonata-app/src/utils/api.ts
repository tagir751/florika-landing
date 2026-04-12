import { NextResponse } from 'next/server'

interface ApiError {
  error: string
}

export function handleApiError(error: unknown, message: string = 'Failed to process request'): ApiError {
  console.error(message, error)
  return { error: message }
}

export function createJsonResponse(data: unknown, status: number = 200): NextResponse {
  return NextResponse.json(data, { status })
}

export function createErrorResponse(message: string, status: number = 500): NextResponse {
  return NextResponse.json({ error: message }, { status })
}

export function validateRequiredFields(body: Record<string, unknown>, fields: string[]): string | null {
  for (const field of fields) {
    if (!body[field]) {
      return `Field '${field}' is required`
    }
  }
  return null
}
