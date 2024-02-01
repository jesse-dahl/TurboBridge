import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const rootTRPCRouter = createTRPCRouter({
  all: publicProcedure.query( async ({ ctx }) => {
  }),
})
