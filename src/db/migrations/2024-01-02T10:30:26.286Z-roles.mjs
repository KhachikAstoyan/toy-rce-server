export const up = async (db) => {
  db.query(`
    CREATE TABLE IF NOT EXISTS permissions (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE
    );

    CREATE TABLE IF NOT EXISTS roles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE
    );

    CREATE TABLE IF NOT EXISTS role_to_permissions (
      role_id INT REFERENCES roles(id),
      permission_id INT REFERENCES permissions(id),
      PRIMARY KEY (role_id, permission_id)
    );

    CREATE TABLE IF NOT EXISTS user_roles (
      user_id INT REFERENCES users(id),
      role_id INT REFERENCES roles(id),
      PRIMARY KEY (user_id, role_id)
    )
  `)
}

export const down = async (db) => {
  // write the down migratio code here
}
