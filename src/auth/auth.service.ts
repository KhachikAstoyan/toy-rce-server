import { db } from '../db'
import { RegisterUserDto } from './helpers/schemas'
import httpError from 'http-errors'
import { hashPassword } from './helpers/utils'
import { omitFields } from '../utils/misc'

export async function login() {
  return 'login'
}

interface IUser {
  username: string
  id: string
  created_at: Date
}

interface UserData {
  data: IUser
  access_token: string
  refresh_token: string
}

export async function register(userData: RegisterUserDto): Promise<UserData> {
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
    access_token: 'das',
    refresh_token: 'dasda',
  }
}
