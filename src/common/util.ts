import { ENV } from "./constants";
import type { EnvGetter } from "./types";

export const toInt = (value: string) => {
  const v = Number.parseInt(value, 10);
  if (Number.isNaN(v)) {
    throw new Error(`Invalid integer: ${value}`);
  }
  return v;
};
export const toBool = (value: string) => JSON.parse(value.toLowerCase());
export const toStr = (value: string) => value;

export const getEnv = <T>(
  key: string,
  {
    env,
    defaultValue,
    xform,
  }: { env: EnvGetter; defaultValue?: T; xform: (value: string) => T }
) => {
  try {
    const value = env.get(key);
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }

    return xform(value);
  } catch (err) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw err;
  }
};

export const getEnvInt = (
  key: string,
  { env, defaultValue }: { env: EnvGetter; defaultValue?: number }
) => getEnv(key, { env, xform: toInt, defaultValue });

export const getEnvBool = (
  key: string,
  { env, defaultValue }: { env: EnvGetter; defaultValue?: boolean }
) => getEnv(key, { env, xform: toBool, defaultValue });

export const getEnvStr = (
  key: string,
  { env, defaultValue }: { env: EnvGetter; defaultValue?: string }
) => getEnv(key, { env, xform: toStr, defaultValue });

export const isDev = ({ env }: { env: EnvGetter }) =>
  getEnvBool(ENV.IS_DEV, { env });

export const ProcessEnvGetter: EnvGetter = {
  get: (key: string) => process.env[key],
};
