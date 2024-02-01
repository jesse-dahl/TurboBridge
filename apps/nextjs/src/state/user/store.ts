/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { type User } from 'types/types'

interface UserState {
  user: User | any
  setUser: (newUser: User | any) => void
}

export const useUserStore = create<UserState>()((set) => ({
  user: {},
  setUser: (newUser) => set(() => ({ user: newUser })),
}))
