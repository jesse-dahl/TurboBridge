import {z} from "zod"
import {trigger} from "@bb/pusher-client"

export const NotifyInput = z.object({
  channel: z.string(),
  event: z.string(),
  message: z.string()
})

export type NotifyInput = z.infer<typeof NotifyInput>

export const notify =  async (input:NotifyInput) => {
  await trigger(input.channel, input.event, input.message)
}
