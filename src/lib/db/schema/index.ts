/** biome-ignore-all lint/performance/noNamespaceImport: <this is fine> */
import * as auth from "./auth";
import * as schema from "./schema";

export default {
  ...auth,
  ...schema,
};
