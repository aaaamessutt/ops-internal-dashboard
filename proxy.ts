import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if accessing dashboard routes (except login)
  if (pathname.startsWith('/dashboard') && pathname !== '/dashboard/login') {
    const authCookie = request.cookies.get('ops_auth');

    // If no auth cookie, redirect to login
    if (!authCookie || authCookie.value !== '1') {
      const loginUrl = new URL('/dashboard/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already logged in and trying to access login, redirect to dashboard
  if (pathname === '/dashboard/login') {
    const authCookie = request.cookies.get('ops_auth');
    if (authCookie && authCookie.value === '1') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
