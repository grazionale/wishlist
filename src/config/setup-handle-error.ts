import { Express, NextFunction, Request, Response } from 'express'
import AppError from '../app/errors/app-error'

export default (app: Express): void => {
  app.use((err: Error, _request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ status: 'error', message: err.message })
    }
    console.log(err)

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  })
}