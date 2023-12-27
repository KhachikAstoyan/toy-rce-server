import { Pool } from 'pg'
import { env } from '../utils/env'

export const db = new Pool({
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  database: env.DB_NAME,
  port: Number(env.DB_PORT),
})
