
import { createClient } from "@supabase/supabase-js";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// import { type Database } from "./supabaseTypes";
export const getServiceSupabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.SUPABASE_API_KEY ?? '',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );


export const clientSupabase = createClientComponentClient(
  {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  }
);

export const supabaseClient = () =>
  typeof window === "undefined" ? getServiceSupabase() : clientSupabase;

// export const getUserAsAdmin = async (token: string) => {
//   const { data, error } = await getServiceSupabase().auth.getUser(token);

//   if (error) {
//     console.error(error);
//     throw error;
//   }

//   return data;
// };