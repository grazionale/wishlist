import request from 'supertest'
import app from '../../src/config/app'
import SetupDatabase from '../../src/config/setup-database'

describe('Client Controller', () => {
  let setupDatabase: SetupDatabase

  beforeAll(async () => {
    setupDatabase = new SetupDatabase()
    await setupDatabase.handle()
  })

  describe('GET /api/clients', () => {
    test('Should return 200 on /api/clients', async () => {
      await request(app)
        .get('/api/clients')
        .expect(200)
    })
  })
})
