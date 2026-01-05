import { ProcessEnvGetter } from "~/common/util";
import { initAuth } from "~/lib/auth";

export const auth = initAuth({ env: ProcessEnvGetter });
