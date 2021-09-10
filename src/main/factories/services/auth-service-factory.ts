import AuthService from '../../../data/services/auth-service'
import UserRepository from '../../../infra/typeorm/user-repository'

export const makeAuthService = (): AuthService => {
  const userRepository = new UserRepository()
  return new AuthService(userRepository)
}
