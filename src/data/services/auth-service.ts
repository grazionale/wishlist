import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import env from '../../main/config/env'
import { IUserRepository } from '../../infra/repositories/user-repository'
import { IAuthService } from '../../domain/services/auth-service'
import AppError from '../../presentation/errors/app-error'

class AuthService implements IAuthService {
  private readonly userRepository: IUserRepository

  constructor (userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  public async auth ({ username, password }: IAuthService.Params): Promise<IAuthService.Result> {
    const userFind = await this.userRepository.findByUsername(username)

    if (!userFind) {
      throw new AppError('incorrect email/password combination', 401)
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
