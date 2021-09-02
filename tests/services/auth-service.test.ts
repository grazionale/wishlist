import IUserCreateRequestDTO from '../../src/app/dtos/repositories/user/user-repository-create-request-dto'
import AppError from '../../src/app/errors/app-error'
import AuthService from '../../src/app/services/auth-service'
import UserService from '../../src/app/services/user-service'
import FakeUserRepository from '../mocks/repositories/fake-user-repository'

const makeUserCreateRequest = (username?: string, password?: string): IUserCreateRequestDTO => {
  return {
    username: username || 'magalu',
    password: password || '123456'
  }
}

describe('AuthService', () => {
  let authService: AuthService
  let userService: UserService
  let fakeUserRepository: FakeUserRepository

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    userService = new UserService(fakeUserRepository)
    authService = new AuthService(fakeUserRepository)
  })

  it('should be able to authenticate with correct credentials', async () => {
    const request = makeUserCreateRequest()
    await userService.create(request)

    const result = await authService.auth(request.username, request.password)

    expect(result).toBe('any_token')
  })

  it('should not be able to authenticate with incorrect credentials', async () => {
    const request = makeUserCreateRequest('magalu', '123456')
    await userService.create(request)

    await expect(authService.auth(
      request.username, '654321'
    ))
      .rejects.toEqual(new AppError('incorrect email/password combination', 401))
  })

  it('should not be able to authenticate with non existing user', async () => {
    await expect(authService.auth('magalu', '123456'))
      .rejects.toEqual(new AppError('user not found', 401))
  })
})
