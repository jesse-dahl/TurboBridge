import db from "../index"
import { users } from "../schema/users"
import type { NewUser, ReturnUser } from "../types"

export const insertUser = async (user: NewUser): Promise<ReturnUser[]> => {
  const newUserRes = await db.insert(users).values(user).returning()
  return newUserRes
}