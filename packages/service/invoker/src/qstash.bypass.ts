import axios from 'axios'
import { env } from '@bb/env'

export const publish = async (url:string, json:unknown, delay = 0):Promise<{messageId: string}> => {
  await axios({
    url: url,
    method: 'post',
    data: {
      json
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': env.INTERNAL_API_KEY,
      'Upstash-Delay': delay
    },
  })
  return {
    messageId: 'nada'
  }
}

export const schedule = async (url:string, json:unknown, cron: string):Promise<{scheduleId: string}> => {
  await axios({
    url: url,
    method: 'post',
    data: {
      json
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': env.INTERNAL_API_KEY,
      'Upstash-Cron': cron
    },
  })
  return {
    scheduleId: 'nada'
  }
}
