import { Request, Response } from 'express'
import { AuthService } from './auth.service'

export class AuthController {
  constructor(private service: AuthService) {}

  async login(req: Request, res: Response) {}

  async register(req: Request, res: Response) {}
}
