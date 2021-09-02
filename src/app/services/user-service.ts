import AppError from '../errors/app-error'
import IUserCreateResponseDTO from '../dtos/services/user/user-service-create-response-dto'
import { IUserRepository } from '../interfaces/repositories/user/user-repository'
import IUserCreateRequestDTO from '../dtos/services/user/user-service-create-request-dto'
import IUserFindByUsernameResponseDTO from '../dtos/services/user/user-service-find-by-username-response-dto'

class UserService {
  private readonly userRepository: IUserRepository

  constructor (
    userRepository: IUserRepository
  ) {
    this.userRepository = userRepository
  }

  public async create (user: IUserCreateRequestDTO): Promise<IUserCreateResponseDTO> {
    const findUser = await this.userRepository.findByUsername(user.username)

    if (findUser) {
      throw new AppError('username already used.')
    }

    const userSaved = await this.userRepository.create(user)

    return userSaved
  }

  public async delete (userId: number): Promise<string> {
    return 'user successfully deleted'
  }

  public async findByUsername (username: string): Promise<IUserFindByUsernameResponseDTO | undefined> {
    return undefined
  }
}

export default UserService
