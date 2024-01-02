import { z } from 'zod'
import dotenv from 'dotenv'
dotenv.config()

const envSchema = z.object({
  DB_USER: z.string().default('postgres'),
  DB_PASSWORD: z.string().default('postgres'),
  DB_HOST: z.string().default('localhost'),
  DB_NAME: z.string().default('postgres'),
  DB_PORT: z.string().default('5432'),
  PORT: z.string().default('8080'),
  JWT_SECRET: z.string().min(10),
  JWT_REFRESH_SECRET: z.string().min(10),
})

export const env = envSchema.parse(process.env)
export const validateEnv = async () => {
  envSchema.parseAsync(process.env)
}
