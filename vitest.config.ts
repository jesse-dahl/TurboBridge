import { defineConfig } from "vitest/config"
import * as dotenv from "dotenv";
dotenv.config({path: './.env'});

export default defineConfig({
  test: {
    globals: true,
    exclude: ["**/*e2e*", "**/*test-examples*"],
    environment: "jsdom",
    // ? environments included in 'include' are not supported here, unless specified in the workspace config
  },
})
