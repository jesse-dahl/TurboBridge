import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import cors from '../../cors'

// import type { Database } from '@/lib/database.types'
export async function OPTIONS(request: Request) {
  return cors(
    request,
    new NextResponse(null, {
      status: 204
    })
  )
}

export async function POST(_request: Request) {
  // const requestUrl = new URL(request.url)
  const cookieStore = cookies()
  // const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `localhost:3000/auth/callback`,
    },
  })
  if (error) {
    return NextResponse.json({
      error
    }, {
      status: 500
    })
  }

  console.log({data})

  return NextResponse.redirect(data.url, {
    status: 301,
  })
}