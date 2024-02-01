import { drizzle } from 'drizzle-orm/postgres-js'
// import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from 'postgres'
import * as users from "./schema/users";

const schema = {
  ...users
}

// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL is missing");
// }

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client, { schema });

export * as userQueries from "./queries/user";
export * as userMutations from "./mutations/user"
export * from "./types"
export default db;