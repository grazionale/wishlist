import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import env from '../../config/env'
import IAuthServiceAuthResponseDTO from '../dtos/services/auth-service/auth-service-auth-response-dto'
import AppError from '../errors/app-error'
import { IUserRepository } from '../interfaces/repositories/user/user-repository'

class AuthService {
  private readonly userRepository: IUserRepository

  constructor (userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  public async auth (username: string, password: string): Promise<IAuthServiceAuthResponseDTO> {
    const userFind = await this.userRepository.findByUsername(username)

    if (!userFind) {
      throw new AppError('incorrect email/password combination', 401) // TODO: alterar mensagem p/ incorrect email/password combination
    }

    const passwordMatched = await compare(
      password,
      userFind.password
    )

    if (!passwordMatched) {
      throw new AppError('incorrect email/password combination', 401)
    }

    const token = sign({}, env.jwt_secret, {
      subject: userFind.id.toString(),
      expiresIn: env.jwt_expiresIn
    })

    return {
      user: userFind.username,
      accessToken: token
    }
  }
}

export default AuthService
