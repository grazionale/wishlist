import UserRepository from '../../repositories/user-repository'
import AuthService from '../../services/auth-service'

export const makeAuthService = (): AuthService => {
  const userRepository = new UserRepository()
  return new AuthService(userRepository)
}
