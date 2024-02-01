import type {users} from "./schema/users";

export type NewUser = typeof users.$inferInsert;
export type ReturnUser = typeof users.$inferSelect