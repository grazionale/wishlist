import { getRepository, Repository } from 'typeorm'
import IUserCreateRequestDTO from '../dtos/repositories/user/user-repository-create-request-dto'
import IUserCreateResponseDTO from '../dtos/repositories/user/user-repository-create-response-dto'
import IUserFindByUsernameResponseDTO from '../dtos/repositories/user/user-repository-find-by-username-response-dto'
import { User } from '../entities/user'
import { IUserRepository } from '../interfaces/repositories/user/user-repository'

class UserRepository implements IUserRepository {
  private readonly ormRepository: Repository<User>

  constructor () {
    this.ormRepository = getRepository(User)
  }

  public async findByUsername (username: string): Promise<IUserFindByUsernameResponseDTO | undefined> {
    const user = await this.ormRepository.findOne({ username: username })

    return user
  }

  public async create (user: IUserCreateRequestDTO): Promise<IUserCreateResponseDTO> {
    const userSaved = await this.ormRepository.save(user)

    return userSaved
  }

  public async delete (userId: number): Promise<string> {
    await this.ormRepository.delete(userId)
    return 'user successfully deleted'
  }
}

export default UserRepository
