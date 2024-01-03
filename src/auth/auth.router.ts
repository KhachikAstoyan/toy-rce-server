import Router from 'express'
import * as authController from './auth.controller'
import { validateSchema } from '../middleware/schemaValidator'
import { authenticateUserSchema } from './helpers/schemas'
import { httpHandler } from '../utils/request'

export const authRouter = Router()

authRouter.post(
  '/register',
  validateSchema(authenticateUserSchema),
  httpHandler(authController.register)
)
authRouter.post(
  '/login',
  validateSchema(authenticateUserSchema),
  httpHandler(authController.login)
)
authRouter.get('/user/:id', httpHandler(authController.getUserInfo))
