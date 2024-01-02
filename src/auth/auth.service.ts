import { db } from '../db'
import { RegisterUserDto } from './helpers/schemas'

export async function login() {
  return 'login'
}

export async function register(userData: RegisterUserDto) {
  const test = await db.query(`SELECT id FROM users WHERE username = $1`, [
    userData.username,
  ])

  console.log(test)

  return 'hey'
}
