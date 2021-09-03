import request from 'supertest'
import { getConnection } from 'typeorm'
import IUserCreateRequestDTO from '../../src/app/dtos/repositories/user/user-repository-create-request-dto'
import { User } from '../../src/app/entities/user'
import UserRepository from '../../src/app/repositories/user-repository'
import UserService from '../../src/app/services/user-service'
import app from '../../src/config/app'
import SetupDatabase from '../../src/config/setup-database'
import config from '../mocks/database/mock-databaseconfig'

const makePostRequest = (username?: string, password?: string): IUserCreateRequestDTO => {
  return {
    username: username || 'magalu',
    password: password || '123456'
  }
}

const makeUser = (username?: string, password?: string): IUserCreateRequestDTO => {
  const user = new User()
  user.username = username || 'magalu'
  user.password = password || '123456'
  return user
}

describe('User Controller', () => {
  let setupDatabase: SetupDatabase
  let userService: UserService
  let userRepository: UserRepository

  beforeEach(async () => {
    setupDatabase = new SetupDatabase(config)
    await setupDatabase.handle()

    userRepository = new UserRepository()
    userService = new UserService(userRepository)
  })

  afterEach(async () => {
    const conn = getConnection()
    return await conn.close()
  })

  describe('POST /api/auth', () => {
    test('should be able to auth user with correct payload', async () => {
      await userService.create(makeUser())

      const payload = makePostRequest()

      await request(app)
        .post('/api/auth')
        .send(payload)
        .expect(200)
        .then(response => {
          expect(response.body).toHaveProperty('accessToken')
          expect(response.body.user).toBe(payload.username)
        })
    })
  })

  describe('POST /api/auth', () => {
    test('should not be able to auth user with incorrect password', async () => {
      await userService.create(makeUser('magalu', '123456'))

      await request(app)
        .post('/api/auth')
        .send(makePostRequest('magalu', '654321'))
        .expect(401)
    })
  })

  describe('POST /api/auth', () => {
    test('should not be able to auth inexistent user', async () => {
      await request(app)
        .post('/api/auth')
        .send(makePostRequest('magalu', '654321'))
        .expect(401)
    })
  })
})
