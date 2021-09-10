import UserService from '../../services/user-service'
import UserRepository from '../../../infra/typeorm/user-repository'

export const makeUserService = (): UserService => {
  const userRepository = new UserRepository()
  return new UserService(userRepository)
}
