import IUserCreateRequestDTO from '../../../dtos/repositories/user/user-repository-create-request-dto'
import IUserCreateResponseDTO from '../../../dtos/repositories/user/user-repository-create-response-dto'
import IUserFindByUsernameResponseDTO from '../../../dtos/repositories/user/user-repository-find-by-username-response-dto'

export interface IUserRepository {
  findByUsername: (username: string) => Promise<IUserFindByUsernameResponseDTO | undefined>
  create: (user: IUserCreateRequestDTO) => Promise<IUserCreateResponseDTO>
}
