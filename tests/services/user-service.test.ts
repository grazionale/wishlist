import IUserCreateRequestDTO from '../../src/app/dtos/repositories/user/user-repository-create-request-dto'
import AppError from '../../src/app/errors/app-error'
import UserService from '../../src/app/services/user-service'
import FakeUserRepository from '../mocks/repositories/fake-user-repository'

const makeUserCreateRequest = (username?: string, password?: string): IUserCreateRequestDTO => {
  return {
    username: username || 'magalu',
    password: password || '123456'
  }
}

describe('UserService', () => {
  let userService: UserService
  let fakeUserRepository: FakeUserRepository

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    userService = new UserService(fakeUserRepository)
  })

  it('should be insert one user', async () => {
    const request = makeUserCreateRequest()

    const user = await userService.create(request)

    expect(user).toEqual({ ...request, id: user.id })
  })

  it('should be not insert one user with e-mail already created', async () => {
    const request = makeUserCreateRequest()
    await userService.create(request)

    await expect(
      userService.create(request)
    ).rejects.toEqual(new AppError('username already used.'))
  })
})