export const up = async (db) => {
  db.query(`
    DELETE FROM users WHERE email IS NULL;

    ALTER TABLE users
      ALTER COLUMN email SET NOT NULL;

    ALTER TABLE users
    ADD CONSTRAINT unique_email UNIQUE (email);
  `)
}

export const down = async (db) => {
  // write the down migratio code here
}
