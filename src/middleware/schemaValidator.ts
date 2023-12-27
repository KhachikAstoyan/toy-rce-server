import { NextFunction, Request } from 'express'
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
    } catch (error) {
      next(error) // send to error handler TODO:
    }
  }
