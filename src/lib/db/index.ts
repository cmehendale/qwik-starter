import { createClient } from "@libsql/client";
import type { DrizzleConfig } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { ENV } from "~/common/constants";
import type { EnvGetter } from "~/common/types";
import { getEnvBool, getEnvStr } from "~/common/util";
import schema from "./schema";
import type { DB } from "./types";

const dialect = "turso" as const;
const casing = "snake_case" as const;

export const getDbConfig = ({ env }: { env: EnvGetter }) => ({
  dbCredentials: {
    url: getEnvStr(ENV.DATABASE_URL, { env }),
    authToken: getEnvStr(ENV.DATABASE_AUTH_TOKEN, { env }),
  },
  logger: getEnvBool(ENV.DATABASE_LOGGER, { env, defaultValue: false }),
  dialect,
  casing,
});

export const initDb = ({
  env,
  opts = {},
}: {
  env: EnvGetter;
  opts?: DrizzleConfig<typeof schema>;
}): DB => {
  const { dbCredentials, casing, logger } = getDbConfig({ env });
  const client = createClient(dbCredentials);

  return {
    db: drizzle(client, {
      schema,
      casing,
      logger,
      ...opts,
    }),
    close: async () => client.close(),
  };
};
