import { Request, Response } from 'express'
import { makeAuthService } from '../../main/factories/services/auth-service-factory'

export default class AuthController {
  public async post (request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body
    const authService = makeAuthService()
    const result = await authService.auth({ username, password })

    return response.json(result)
  }
}
