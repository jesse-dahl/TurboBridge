import type { AppRouter } from "@bb/trpc";
import superjson from "superjson";
import { getAPIUrl } from "@bb/env";
import {createTRPCProxyClient, httpBatchLink } from "@trpc/client"

export const serverClient = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${getAPIUrl}/api/trpc`,
    }),
  ],
})