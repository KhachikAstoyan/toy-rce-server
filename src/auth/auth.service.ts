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
    `INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *`,
    [userData.username, hashedPassword]
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
    SELECT username, password_hash, created_at FROM users
    WHERE username = $1
  `,
    [userData.username]
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
