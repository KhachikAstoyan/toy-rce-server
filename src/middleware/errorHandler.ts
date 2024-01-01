import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { HttpError } from 'http-errors'

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      error: 'ValidationError',
      ...error,
    })

    return
  }

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      error: error.name,
      message: error.message,
    })

    return
  }

  res.status(500).json({
    error: 'InternalServerError',
    message: error instanceof Error ? error.message : 'Something went wrong',
  })
}
