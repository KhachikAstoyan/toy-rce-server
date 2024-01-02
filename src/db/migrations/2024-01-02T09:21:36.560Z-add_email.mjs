export const up = async (db) => {
  db.query(`
    ALTER TABLE users
    ADD COLUMN email VARCHAR,
    ALTER COLUMN username TYPE VARCHAR,
    ALTER COLUMN password_hash TYPE VARCHAR
  `)
}

export const down = async (db) => {
  // write the down migratio code here
}
