import { httpBatchLink, loggerLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import superjson from "superjson"
import { getAPIUrl, isProduction } from "@bb/env"
import type { AppRouter } from "@bb/trpc"
import { QueryClient } from "@tanstack/react-query"

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0
    },
  },
})


export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      queryClient: client,
      links: [
        loggerLink({
          enabled: (opts) => !isProduction() || (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getAPIUrl}/api/trpc`,
        }),
      ],
    }
  },
  ssr: false,
})