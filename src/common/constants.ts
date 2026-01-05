export const ENV = {
  DATABASE_URL: "DATABASE_URL",
  DATABASE_AUTH_TOKEN: "DATABASE_AUTH_TOKEN",
  BETTER_AUTH_SECRET: "BETTER_AUTH_SECRET",
  IS_DEV: "IS_DEV",
  LOG_LEVEL: "LOG_LEVEL",
  DATABASE_LOGGER: "DATABASE_LOGGER",
  ADMIN_NAME: "ADMIN_NAME",
  ADMIN_EMAIL: "ADMIN_EMAIL",
  ADMIN_PASSWORD: "ADMIN_PASSWORD",
  ORGANIZATION_NAME: "ORGANIZATION_NAME",
} as const;

export const CONTEXT = "context";

export const SESSION = "session";
export const USER = "user";
export const ORGANIZATIONS = "organizations";
export const ACTIVE_ORGANIZATION = "active_organization";
export const TEAMS = "teams";

export const RES_COOKIE_HEADER = "set-cookie";
export const REQ_COOKIE_HEADER = "cookie";
export const PASSWORD_MIN_LEN = 1;
export const REDIRECT_302 = 302;
export const REDIRECT_TO = "redirectTo";
export const REDIRECT_DELAY = 1000;
