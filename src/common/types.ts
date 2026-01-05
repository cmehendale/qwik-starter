export type EnvGetter = {
  get: (key: string) => string | undefined;
};
