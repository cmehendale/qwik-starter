import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { ProcessEnvGetter } from "~/common/util";
import { getClientConfig } from "~/lib/db";

export default defineConfig({
  out: "src/lib/db/migrations",
  schema: "src/lib/db/schema",
  dialect: "turso",
  dbCredentials: getClientConfig({ env: ProcessEnvGetter }),
  casing: "snake_case",
});
