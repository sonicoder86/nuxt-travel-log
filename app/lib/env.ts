import { z } from "zod";

import tryParseEnv from "./try-parse-env";

const envSchema = z.object({
  NODE_ENV: z.string(),
  TURSO_DATABASE_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string(),
});

export type EnvSchema = z.infer<typeof envSchema>;

// eslint-disable-next-line node/no-process-env
export default tryParseEnv(envSchema, process.env);
