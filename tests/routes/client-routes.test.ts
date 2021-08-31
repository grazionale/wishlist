import request from 'supertest'
import { getConnection, getRepository, Repository } from 'typeorm'
import { Client } from '../../src/app/entities/Client'
import app from '../../src/config/app'
import SetupDatabase from '../../src/config/setup-database'
import config from '../mocks/database/mock-databaseconfig'

const makeClient = (email?: string): Client => {
  const client = new Client()
  client.email = email || 'client@email.com'
  client.name = 'client'

  return client
}

describe('Client Routes', () => {
  let setupDatabase: SetupDatabase
  let clientRepository: Repository<Client>

  beforeEach(async () => {
    setupDatabase = new SetupDatabase(config)
    await setupDatabase.handle()

    clientRepository = getRepository(Client)

    await clientRepository.save([makeClient()])
  })

  afterEach(async () => {
    const conn = getConnection()
    return await conn.close()
  })

  describe('GET /api/clients', () => {
    test('Should return 200 on /api/clients', async () => {
      await request(app)
        .get('/api/clients')
        .expect(200)
    })
  })

  describe('GET /api/clients/:client_id', () => {
    test('Should return 200 on /api/clients/:client_id', async () => {
      await request(app)
        .get('/api/clients/1')
        .expect(200)
    })
  })
})
