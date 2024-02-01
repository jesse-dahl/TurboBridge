/*
 * Do Not Manually Modify
 * Generated with env.types.generator.ts
 */

import {z} from 'zod'

export const BiproxiRuntimeConfigSchema = z.object({
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
  NODE_ENV: z.string().min(1),
  PORT: z.string().min(1),
  SUPABASE_API_KEY: z.string().min(1),
  SUPABASE_DB_NAME: z.string().min(1),
  SUPABASE_DB_PASS: z.string().min(1),
  SUPABASE_URL: z.string().min(1),
  VERCEL_URL: z.string().min(1),
})

export type BiproxiRuntimeConfig = z.infer<typeof BiproxiRuntimeConfigSchema>

export const getRuntimeConfig = (cfg: BiproxiRuntimeConfig): BiproxiRuntimeConfig => ({
  DATABASE_URL: cfg.DATABASE_URL,
  DIRECT_URL: cfg.DIRECT_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: cfg.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL: cfg.NEXT_PUBLIC_SUPABASE_URL,
  NODE_ENV: cfg.NODE_ENV,
  PORT: cfg.PORT,
  SUPABASE_API_KEY: cfg.SUPABASE_API_KEY,
  SUPABASE_DB_NAME: cfg.SUPABASE_DB_NAME,
  SUPABASE_DB_PASS: cfg.SUPABASE_DB_PASS,
  SUPABASE_URL: cfg.SUPABASE_URL,
  VERCEL_URL: cfg.VERCEL_URL,
})
