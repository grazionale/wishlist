import { getRepository, Repository } from 'typeorm'
import { User } from '../../domain/entities/user'
import { IUserRepository } from '../repositories/user-repository'

class UserRepository implements IUserRepository {
  private readonly ormRepository: Repository<User>

  constructor () {
    this.ormRepository = getRepository(User)
  }

  public async findByUsername (username: string): Promise<IUserRepository.FindByUsernameResult | undefined> {
    const user = await this.ormRepository.findOne({ username: username })

    return user
  }

  public async create (user: IUserRepository.CreateParams): Promise<IUserRepository.CreateResult> {
    const userSaved = await this.ormRepository.save(user)

    return userSaved
  }
}

export default UserRepository
