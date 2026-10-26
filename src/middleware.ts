import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;
  const pass = searchParams.get('pass');

  if (pathname.startsWith('/admin') && pass !== 'secret123') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};