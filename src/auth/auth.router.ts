import Router from 'express'
import * as authController from './auth.controller'
import { validateSchema } from '../middleware/schemaValidator'
import { registerUserSchema } from './helpers/schemas'

export const authRouter = Router()

authRouter.post(
  '/register',
  validateSchema(registerUserSchema),
  authController.register
)
authRouter.post('/login', authController.login)
