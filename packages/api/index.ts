import type {inferRouterInputs, inferRouterOutputs} from "@trpc/server";
import type {AppRouter} from "./src/root";

// export * from './src/prisma'

export { appRouter, type AppRouter } from "./src/root"
export { createTRPCContext, createTRPCRouter, protectedProcedure, publicProcedure } from "./src/trpc"

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;