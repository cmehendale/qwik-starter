import { createClient } from "@libsql/client";
import type { DrizzleConfig } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { ENV } from "~/common/constants";
import type { EnvGetter } from "~/common/types";
import { getEnvBool, getEnvStr } from "~/common/util";
import { schema } from "./schema";
import type { DB } from "./types";

export const getClientConfig = ({ env }: { env: EnvGetter }) => ({
  url: getEnvStr(ENV.DATABASE_URL, { env }),
  authToken: getEnvStr(ENV.DATABASE_AUTH_TOKEN, { env }),
});

export const initDb = ({
  env,
  opts = {},
}: {
  env: EnvGetter;
  opts?: DrizzleConfig<typeof schema>;
}): DB => {
  const client = createClient(getClientConfig({ env }));

  return {
    db: drizzle(client, {
      schema,
      casing: "snake_case",
      ...{
        ...opts,
        logger: getEnvBool(ENV.DATABASE_LOGGER, { env, defaultValue: false }),
      },
    }),
    close: async () => client.close(),
  };
};
