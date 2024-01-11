import { NextRequest, NextResponse } from 'next/server'
import type { Context } from '@/types/api'

export const config = {
  matcher: '/api/:function*',
}

export function middleware(request: NextRequest, context: Context) {
  const { pathname } = request.nextUrl
  const validateCategoryTypeRouteWithId = ['/api/category/type/']
  const validateRouteWithId = ['/api/account/', '/api/category/', '/api/transaction/', '/api/transfer/']
  
  if (validateCategoryTypeRouteWithId.some(route => pathname.startsWith(route))) {
    const parts = pathname.split('/').filter(Boolean)
    const ids = parts.filter(Number)
    
    if (parts.length <= 4 && !ids.length) {
      return NextResponse.json({ message: `invalid id parameter to ${pathname}` })
    }
    
    return NextResponse.next()
  }
  
  if (validateRouteWithId.some(route => pathname.startsWith(route))) {
    const parts = pathname.split('/').filter(Boolean)
    const ids = parts.filter(Number)
    
    if ((parts.length <= 3 && !ids.length) || (parts.length > 3 && ids.length < 2)) {
      return NextResponse.json({ message: `invalid id parameter to ${pathname}` })
    }
  }
  
  return NextResponse.next()
}