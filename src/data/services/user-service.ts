import { hash } from 'bcryptjs'
import AppError from '../../presentation/errors/app-error'
import { IUserService } from '../../domain/services/user-service'
import { IUserRepository } from '../../infra/repositories/user-repository'

class UserService implements IUserService {
  private readonly userRepository: IUserRepository

  constructor (
    userRepository: IUserRepository
  ) {
    this.userRepository = userRepository
  }

  public async create (user: IUserService.CreateParams): Promise<IUserService.CreateResult> {
    const findUser = await this.userRepository.findByUsername(user.username)

    if (findUser) {
      throw new AppError('username already used.', 400)
    }

    const hashedPassword = await hash(user.password, 8)
    const userSaved = await this.userRepository.create({
      username: user.username,
      password: hashedPassword
    })

    return {
      id: userSaved.id,
      username: userSaved.username
    }
  }
}

export default UserService
