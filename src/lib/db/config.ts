import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { ProcessEnvGetter } from "~/common/util";
import { getDbConfig } from "~/lib/db";

const { dbCredentials, casing, dialect } = getDbConfig({
  env: ProcessEnvGetter,
});

export default defineConfig({
  out: "src/lib/db/migrations",
  schema: "src/lib/db/schema",
  dbCredentials,
  casing,
  dialect,
});
