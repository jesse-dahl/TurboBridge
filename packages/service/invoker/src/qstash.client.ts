import {Client} from "@upstash/qstash"
import { env } from '@bb/env'

export const qstash: Client  = new Client({
  token: env.QSTASH_TOKEN ?? '',
})

export const publish = async (url:string, json:unknown, delay = 0):Promise<{messageId: string}> => {
  return qstash.publishJSON({
    url,
    delay,
    body: {
      json
    },
    headers: {
      "Upstash-Forward-Authorization": env.INTERNAL_API_KEY
    }
  })
}

export const schedule = async (url:string, json:unknown, cron:string):Promise<{scheduleId: string}> => {
  return qstash.publishJSON({
    url,
    cron,
    body: {
      json
    },
    headers: {
      "Upstash-Forward-Authorization": env.INTERNAL_API_KEY
    }
  })
}
