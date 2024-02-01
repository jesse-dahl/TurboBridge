import {createTRPCRouter, protectedProcedure} from "@bb/trpc"
import {InvokeInput, InvokeOutput, invoke, ScheduleInput, ScheduleOutput, schedule} from "./invoker.service"

export const invokerTRPCRouter = createTRPCRouter({
  invoke: protectedProcedure
    .input(
      InvokeInput
    )
    .output(
      InvokeOutput
    )
    .mutation(async ({input}): Promise<InvokeOutput> => {
      return invoke(input)
    }),
  schedule: protectedProcedure
    .input(
      ScheduleInput
    )
    .output(
      ScheduleOutput
    )
    .mutation(async ({input}): Promise<ScheduleOutput> => {
      return schedule(input)
    }),
})
