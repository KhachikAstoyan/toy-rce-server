import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto'
import jwt from 'jsonwebtoken'
import { env } from '../../utils/env'
import { Response } from 'express'

const ACCESS_TOKEN_EXPIRY_SECONDS = 60 // seconds
const REFRESH_TOKEN_EXPIRY_SECONDS = 10 * 24 * 60 * 60

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
  const hashedPassword = Buffer.from(encryptPassword(password, salt), 'hex')

  return timingSafeEqual(originalHashedPass, hashedPassword)
}

export function setRefreshTokenCookie(res: Response, token: string) {
  res.cookie('refresh_token', token, {
    httpOnly: true,
    secure: true,
    path: '/refresh',
    maxAge: REFRESH_TOKEN_EXPIRY_SECONDS * 1000,
  })
}

async function generateToken(
  payload: any,
  secret: string,
  expiry: number
): Promise<string> {
  return new Promise((res, rej) => {
    jwt.sign(payload, secret, { expiresIn: expiry }, (err, token) => {
      if (err) {
        rej(err)
        return
      }

      if (token) {
        res(token)
        return
      }

      rej()
    })
  })
}

export async function createAccessToken(payload: any) {
  return generateToken(payload, env.JWT_SECRET, ACCESS_TOKEN_EXPIRY_SECONDS)
}

export async function createRefreshToken(payload: any) {
  return generateToken(
    payload,
    env.JWT_REFRESH_SECRET,
    REFRESH_TOKEN_EXPIRY_SECONDS
  )
}
