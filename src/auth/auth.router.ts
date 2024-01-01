import Router from 'express'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { validateSchema } from '../middleware/schemaValidator'
import { registerUserSchema } from './helpers/schemas'

export const authRouter = () => {
  const router = Router()
  const authService = new AuthService()
  const authController = new AuthController(authService)

  router.post(
    '/register',
    validateSchema(registerUserSchema),
    authController.register
  )
  router.post('/login', authController.login)

  return router
}
