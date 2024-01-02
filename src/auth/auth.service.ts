import { db } from '../db'
import { AuthenticateUserDto } from './helpers/schemas'
import httpError from 'http-errors'
import {
  createAccessToken,
  createRefreshToken,
  hashPassword,
  matchPassword,
} from './helpers/utils'
import { omitFields } from '../utils/misc'
import { IUser, IUserRecord, UserData } from './helpers/types'

export async function register(
  userData: AuthenticateUserDto
): Promise<UserData> {
  const foundUser = await db.query(`SELECT id FROM users WHERE username = $1`, [
    userData.username,
  ])

  if (foundUser.rowCount && foundUser.rowCount > 0) {
    throw new httpError.Conflict('username exists')
  }

  const hashedPassword = hashPassword(userData.password)
  const query = await db.query(
    `INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING *`,
    [userData.username, hashedPassword, userData.email]
  )

  const newUser: IUser = query.rows[0]
  if (!newUser) throw new httpError.InternalServerError('Couldnt create a user')

  omitFields(newUser, ['password_hash'])

  return {
    data: newUser,
    access_token: await createAccessToken({ id: newUser.id }),
    refresh_token: await createRefreshToken({ id: newUser.id }),
  }
}

export async function login(userData: AuthenticateUserDto): Promise<UserData> {
  const foundUser = await db.query(
    `
    SELECT * FROM users
    WHERE username = $1 AND email = $2;
  `,
    [userData.username, userData.email]
  )

  if (!foundUser.rowCount)
    throw new httpError.Unauthorized('IncorrectCredentials')

  const user: IUserRecord = foundUser.rows[0]
  const isValidPassword = matchPassword(userData.password, user.password_hash)

  if (!isValidPassword) throw new httpError.Unauthorized('IncorrectPassword')
  omitFields(user, ['password_hash'])

  const tokenPayload = { id: user.id }

  return {
    data: user,
    access_token: await createAccessToken(tokenPayload),
    refresh_token: await createRefreshToken(tokenPayload),
  }
}

const addRoleToUser = `
-- Assuming 'user_id' is the ID of the user and 'role_id' is the ID of the 'admin' role
INSERT INTO user_roles (user_id, role_id)
VALUES ((SELECT id FROM users WHERE username = 'JohnDoe'), (SELECT id FROM roles WHERE name = 'admin'));
`

const getRolePermissons = `
SELECT p.*
FROM permissions p
JOIN role_to_permissions rp ON p.id = rp.permission_id
JOIN roles r ON rp.role_id = r.id
WHERE r.name = 'admin';
`
const getUserPermissions = `
SELECT p.*
FROM permissions p
JOIN role_to_permissions rp ON p.id = rp.permission_id
JOIN roles r ON rp.role_id = r.id
JOIN user_roles ur ON r.id = ur.role_id
JOIN users u ON ur.user_id = u.id
WHERE u.username = 'desired_username';
`
