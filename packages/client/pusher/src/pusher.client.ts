import {env} from '@bb/env'
import * as Pusher from 'pusher'

const pusherClient = Pusher.forCluster(env.NEXT_PUBLIC_PUSHER_APP_CLUSTER ?? '', {
  appId: env.PUSHER_APP_ID ?? '',
  key: env.NEXT_PUBLIC_PUSHER_APP_KEY ?? '',
  secret: env.PUSHER_APP_SECRET ?? '',
  useTLS: true,
})

export const trigger = async (channel:string, event:string, message:string):Promise<Pusher.Response> => {
  return await pusherClient.trigger(channel, event, { message })
}
