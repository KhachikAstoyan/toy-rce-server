import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto'

function encryptPassword(password: string, salt: string): string {
  return scryptSync(password, salt, 32).toString('hex')
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  return encryptPassword(password, salt) + salt
}

export function matchPassword(password: string, hash: string): boolean {
  const salt = hash.slice(64)
  const originalHashedPass = Buffer.from(hash.slice(0, 64), 'hex')
  const hashedPassword = Buffer.from(hashPassword(password), 'hex')

  return timingSafeEqual(originalHashedPass, hashedPassword)
}
