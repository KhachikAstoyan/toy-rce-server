import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { HandleErrors } from '../utils/decorators'

export class AuthController {
  constructor(private service: AuthService) {}

  async login(req: Request, res: Response) {}

  @HandleErrors
  async register(req: Request, res: Response) {
    res.json({ ok: 'ok' })
  }
}
