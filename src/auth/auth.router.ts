import Router from 'express'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

export const authRouter = () => {
  const router = Router()
  const authService = new AuthService()
  const authController = new AuthController(authService)

  router.post('/register', authController.register)
  router.post('/login', authController.login)

  return router
}
