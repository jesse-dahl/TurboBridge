import {publish as publishQstash, schedule as scheduleQstash} from './qstash.client'
import {publish as publishBypass, schedule as scheduleBypass} from './qstash.bypass'
import {z} from "zod"
import {getAPIUrl} from "@bb/env"

const toTRPCUrl = (key:unknown): string => {
  return `${getAPIUrl}/api/trpc/${Array.isArray(key) && Array.isArray(key[0]) ? key[0].join('.') : ''}`
}

export const InvokeInput = z.object({
  url: z.unknown(),
  payload: z.unknown(),
  delay: z.optional(z.number())
})

export const InvokeOutput = z.object({
  messageId: z.string()
})

export type InvokeInput = z.infer<typeof InvokeInput>
export type InvokeOutput = z.infer<typeof InvokeOutput>

export const ScheduleInput = z.object({
  url: z.unknown(),
  payload: z.unknown(),
  cron: z.string().min(1)
})

export const ScheduleOutput = z.object({
  scheduleId: z.string()
})

export type ScheduleInput = z.infer<typeof ScheduleInput>
export type ScheduleOutput = z.infer<typeof ScheduleOutput>

export const invoke =  async (input:InvokeInput) => {
  const url = typeof input.url === 'string' ? input.url : toTRPCUrl(input.url)
  if( !url.startsWith('http://localhost') ) {
    console.log("publish")
    return await publishQstash(url, input.payload)
  } else {
    console.log("bypass")
    return await publishBypass(url, input.payload)
  }
}

export const schedule =  async (input:ScheduleInput) => {
  const url = typeof input.url === 'string' ? input.url : toTRPCUrl(input.url)
  if( !url.startsWith('http://localhost') ) {
    return await scheduleQstash(url, input.payload, input.cron)
  } else {
    return await scheduleBypass(url, input.payload, input.cron)
  }
}
