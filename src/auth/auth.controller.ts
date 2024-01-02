import { Request, Response } from 'express'
import * as authService from './auth.service'
import { RequestHandler } from '../utils/decorators'

export async function login(req: Request, res: Response) {}

export async function register(req: Request, res: Response) {
  res.json({ ok: authService.register(req.body) })
}
