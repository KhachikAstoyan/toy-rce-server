import { NextFunction, Request, Response } from 'express'
import * as authService from './auth.service'

export async function login(req: Request, res: Response) {
  res.json(await authService.login(req.body))
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = await authService.register(req.body)
  res.json(result)
}
