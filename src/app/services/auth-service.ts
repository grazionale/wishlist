import AppError from '../errors/app-error'

class AuthService {
  public async auth (username: string, password: string): Promise<string> {
    if (username !== password) {
      throw new AppError('incorrect email/password combination', 401)
    }
    return 'any_token'
  }
}

export default AuthService
