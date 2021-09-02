import { Request, Response } from 'express'
import { makeUserService } from '../factories/services/user-service-factory'

export default class UseController {
  public async post (request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body
    const userService = makeUserService()

    const user = await userService.create({ username, password })

    return response.json(user)
  }
}
