
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
// import type { Database } from '@/lib/database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  // res.headers.append('Access-Control-Allow-Credentials', "true")
  // res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
  // res.headers.append('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
  // res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
  // res.headers.append(
  //     'Access-Control-Allow-Headers',
  //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  // )
  
  // Refresh session if expired - required for Server Components
  const session = await supabase.auth.getSession()

  if (session) {
    return res
  }

  // Auth condition not met, redirect to login page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = '/login';
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

// Ensure the middleware is only called for relevant paths.
  /*
  * Match all request paths except for the ones starting with:
  * - _next/static (static files)
  * - _next/image (image optimization files)
  * - favicon.ico (favicon file)
  */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}