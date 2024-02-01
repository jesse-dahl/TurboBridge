import { authRouter } from './router/authRouter'
import { rootTRPCRouter } from './router/rootRouter'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  root: rootTRPCRouter,
  auth: authRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
