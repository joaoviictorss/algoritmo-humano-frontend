import { z } from "zod";

const serverSchema = z.object({});

const serverEnv = serverSchema.safeParse(process.env);

export const env = serverEnv.data;
