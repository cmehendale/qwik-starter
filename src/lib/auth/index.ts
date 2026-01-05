import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { ENV } from "~/common/constants";
import type { EnvGetter } from "~/common/types";
import { getEnvStr } from "~/common/util";
import { initDb } from "~/lib/db";
import type { Database } from "~/lib/db/types";

import admin from "./plugins/admin";
import anonymous from "./plugins/anonymous";
import organization from "./plugins/organization";

export type AuthType = ReturnType<typeof initAuth>;
export type Session = AuthType["$Infer"]["Session"];

export const initAuth = ({
  db: _db,
  secret: _secret,
  env,
}: {
  db?: Database;
  secret?: string;
  env: EnvGetter;
}) => {
  const secret = _secret ?? getEnvStr(ENV.BETTER_AUTH_SECRET, { env });
  const db = _db ?? initDb({ env });

  if (!db) {
    throw new Error("Database not defined");
  }

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite", // or "mysql", "sqlite"
    }),
    secret,
    emailAndPassword: {
      enabled: true,
    },
    plugins: [admin, anonymous, organization],
  });
};
