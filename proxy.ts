import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow access to login page
  if (pathname === '/dashboard/login') {
    return NextResponse.next();
  }

  // Check if accessing protected dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const authCookie = request.cookies.get('ops_auth');

    // If no auth cookie, redirect to login
    if (!authCookie || authCookie.value !== '1') {
      const loginUrl = new URL('/dashboard/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
