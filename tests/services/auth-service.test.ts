import IUserCreateRequestDTO from '../../src/app/dtos/repositories/user/user-repository-create-request-dto'
import AppError from '../../src/app/errors/app-error'
import AuthService from '../../src/app/services/auth-service'
import FakeUserRepository from '../mocks/repositories/fake-user-repository'

const makeUserCreateRequest = (username?: string, password?: string): IUserCreateRequestDTO => {
  return {
    username: username || 'magalu',
    password: password || '123456'
  }
}

describe('AuthService', () => {
  let authService: AuthService
  let fakeUserRepository: FakeUserRepository

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    authService = new AuthService(fakeUserRepository)
  })

  it('should not be able to authenticate with incorrect credentials', async () => {
    await fakeUserRepository.create(makeUserCreateRequest())
    await expect(authService.auth('magalu', '123456'))
      .rejects.toEqual(new AppError('incorrect email/password combination', 401))
  })

  it('should not be able to authenticate with non existing user', async () => {
    await expect(authService.auth('magalu', '123456'))
      .rejects.toEqual(new AppError('user not found', 401))
  })
})
