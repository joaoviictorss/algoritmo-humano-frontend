import { env as clientEnv } from "./client";

let serverEnv = {};
if (typeof window === "undefined") {
  const { env: serverEnvSchema } = require("./server");
  serverEnv = serverEnvSchema;
}

export const env = {
  ...clientEnv,
  ...serverEnv,
};
