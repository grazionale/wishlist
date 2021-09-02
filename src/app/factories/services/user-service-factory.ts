import UserService from '../../services/user-service'
import UserRepository from '../../repositories/user-repository'

export const makeUserService = (): UserService => {
  const userRepository = new UserRepository()
  return new UserService(userRepository)
}
