import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/app/lib/supabase';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  try {
    // Refresh session if expired - required for Server Components
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Protect dashboard routes
    if (req.nextUrl.pathname.startsWith('/dashboard') && !session) {
      const redirectUrl = new URL('/auth/signin', req.url);
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Redirect authenticated users away from auth pages
    if (session && (
      req.nextUrl.pathname.startsWith('/auth/signin') ||
      req.nextUrl.pathname.startsWith('/auth/signup')
    )) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return res;
  } catch (error) {
    // If there's an error with the session, redirect to signin
    console.error('Middleware auth error:', error);
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
    return res;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};