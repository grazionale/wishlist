import { User } from '../../../src/domain/entities/user'
import IUserCreateRequestDTO from '../../../src/app/dtos/repositories/user/user-repository-create-request-dto'
import IUserCreateResponseDTO from '../../../src/app/dtos/repositories/user/user-repository-create-response-dto'
import IUserFindByUsernameResponseDTO from '../../../src/app/dtos/repositories/user/user-repository-find-by-username-response-dto'
import { IUserRepository } from '../../../src/app/interfaces/repositories/user/user-repository'

class FakeUserRepository implements IUserRepository {
  private readonly users: User[] = []

  public async findByUsername (username: string): Promise<IUserFindByUsernameResponseDTO | undefined> {
    return this.users.find(user => user.username.toString() === username)
  }

  public async create (userData: IUserCreateRequestDTO): Promise<IUserCreateResponseDTO> {
    const user = new User()
    Object.assign(user, { id: 1, ...userData })
    this.users.push(user)
    return user
  }
}

export default FakeUserRepository
