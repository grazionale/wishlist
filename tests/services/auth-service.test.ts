import AppError from '../../src/app/errors/app-error'
import AuthService from '../../src/app/services/auth-service'

describe('AuthService', () => {
  let authService: AuthService

  beforeEach(() => {
    authService = new AuthService()
  })

  it('should be return 401 when try auth user with incorrect credentials', async () => {
    await expect(authService.auth('magalu', '123456'))
      .rejects.toEqual(new AppError('incorrect email/password combination', 401))
  })
})
