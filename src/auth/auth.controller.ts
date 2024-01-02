import { Request, Response } from 'express'
import * as authService from './auth.service'
import { setRefreshTokenCookie } from './helpers/utils'

export async function login(req: Request, res: Response) {
  const result = await authService.login(req.body)

  setRefreshTokenCookie(res, result.refresh_token)

  res.json({
    user: result.data,
    token: result.access_token,
  })
}

export async function register(req: Request, res: Response) {
  const result = await authService.register(req.body)
  setRefreshTokenCookie(res, result.refresh_token)

  res.json({
    user: result.data,
    token: result.access_token,
  })
}

export async function getUserInfo(req: Request, res: Response) {
  // const info =
  res.send('tbd')
}
