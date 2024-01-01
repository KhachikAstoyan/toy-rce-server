import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

export const validateSchema =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (error) {
      next(error) // send to error handler TODO:
    }
  }
