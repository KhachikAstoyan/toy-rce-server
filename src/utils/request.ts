import { NextFunction, Request, Response } from 'express'

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>

export const httpHandler = (handler: Handler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
