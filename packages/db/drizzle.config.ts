import type { Config } from "drizzle-kit";
 console.log(process.env.DATABASE_URL)
// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL is missing");
// }

export default {
  schema: "./schema/*",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  }
} satisfies Config;