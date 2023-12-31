import { db } from '..'

const schema = `
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
`

export const up = async () => {
  await db.connect()

  // write the up migration code here
  db.query(schema)
}

export const down = async () => {
  await db.connect()

  // write the down migratio code here
}
