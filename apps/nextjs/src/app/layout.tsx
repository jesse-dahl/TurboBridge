import React from 'react'
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { headers, cookies } from "next/headers";

import "../styles/global.css";

import { TRPCReactProvider } from "./providers/trpcReactProvider";
import { AuthProvider } from "./providers/authProvider";
import { getServerUser } from '~/utils/auth';
import NavLayout from './_components/layouts/NavLayout';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

/**
 * Since we're passing `headers()` to the `TRPCReactProvider` we need to
 * make the entire app dynamic. You can move the `TRPCReactProvider` further
 * down the tree (e.g. /dashboard and onwards) to make part of the app statically rendered.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Starter app",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Start app",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://jessedahl.me",
    siteName: "Start app",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@jessedahl05",
  //   creator: "@jessedahl05",
  // },
};

// Replaces pages/_app.tsx and pages/_document.tsx files
export default async function Layout(props: { children: React.ReactNode }) {
  const user = await getServerUser();

  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={["h-full font-sans", fontSans.variable].join(" ")}>
        <TRPCReactProvider headers={headers()}>
          <AuthProvider {...user}>
            {
              session ? (
                <NavLayout>
                  {props.children}
                </NavLayout>
              ) : (
                <>
                {props.children}
                </>
              )
            }
          </AuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}