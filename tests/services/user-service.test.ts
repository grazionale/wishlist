import IUserCreateRequestDTO from '../../src/app/dtos/repositories/user/user-repository-create-request-dto'
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
})
