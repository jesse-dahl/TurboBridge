import { LoginPayload } from '@bb/trpc/src/router/authRouter'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// import type { Database } from '@/lib/database.types'

const LoginPayload = z.object({
  email: z.string()
})

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const parsedBody = await request.json() as LoginPayload

  const validatedRes = LoginPayload.safeParse(parsedBody)

  if (!validatedRes.success) {
    const { errors } = validatedRes.error;
  
    return NextResponse.json({
      error: { message: "Invalid request", errors },
    }, {
      status: 400
    });
  }
  const { email } = validatedRes.data
  const cookieStore = cookies()
  // const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${requestUrl.origin}/home`,
    }
  })

  if (error) {
    console.log({error})
    return NextResponse.json({
      error
    }, {
      status: 500
    })
  }

  console.log({data})

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  })
}