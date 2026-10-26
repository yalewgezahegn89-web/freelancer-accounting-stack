import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // If they are trying to access the admin page
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check if they have the secret cookie
    const hasCookie = request.cookies.has('admin_auth');

    // If not, check if they provided the password in the URL
    const pass = request.nextUrl.searchParams.get('pass');

    if (pass === 'secret123') {
      // Password is correct! Set the cookie and let them in.
      const response = NextResponse.next();
      response.cookies.set('admin_auth', 'true', { path: '/' });
      return response;
    }

    // If no cookie and no correct password, kick them out
    if (!hasCookie) {
      return new NextResponse('Unauthorized. Please visit /admin?pass=secret123', { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};