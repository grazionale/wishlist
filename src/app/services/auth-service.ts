import AppError from '../errors/app-error'
import { IUserRepository } from '../interfaces/repositories/user/user-repository'

class AuthService {
  private readonly userRepository: IUserRepository

  constructor (userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  public async auth (username: string, password: string): Promise<string> {
    const userFind = await this.userRepository.findByUsername(username)

    if (!userFind) {
      throw new AppError('user not found', 401) // TODO: alterar mensagem p/ incorrect email/password combination
    }

    if (username !== userFind.username || password !== userFind.password) {
      throw new AppError('incorrect email/password combination', 401)
    }

    return 'any_token'
  }
}

export default AuthService
