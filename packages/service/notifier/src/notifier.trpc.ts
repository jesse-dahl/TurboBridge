import { createTRPCRouter, protectedProcedure } from "@bb/trpc"
import { notify, NotifyInput } from "./notifier.service"


export const notifierTRPCRouter = createTRPCRouter({
  notify: protectedProcedure
    .input(
      NotifyInput
    )
    .mutation( async ({ input}) => {
      // console.warn(`notify mutation ${JSON.stringify(input)}`)
      await notify(input)
    }),
})
