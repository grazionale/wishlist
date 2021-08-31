import request from 'supertest'
import { getConnection, getRepository, Repository } from 'typeorm'
import { Client } from '../../src/app/entities/Client'
import app from '../../src/config/app'
import SetupDatabase from '../../src/config/setup-database'
import config from '../mocks/database/mock-databaseconfig'
import IClientPostRequestDTO from '../../src/app/services/dtos/client-service-post-request-dto'

const makeClient = (email?: string): Client => {
  const client = new Client()
  client.email = email || 'client@email.com'
  client.name = 'client'

  return client
}

const makePostRequest = (name?: string, email?: string): IClientPostRequestDTO => {
  return {
    name: name || 'um nome qualquer',
    email: email || 'umemailqualquer@email.com'
  }
}

describe('Client Controller', () => {
  let setupDatabase: SetupDatabase
  let clientRepository: Repository<Client>

  beforeEach(async () => {
    setupDatabase = new SetupDatabase(config)
    await setupDatabase.handle()

    clientRepository = getRepository(Client)

    await clientRepository.save(
      [makeClient(),
        makeClient('client2@email.com')]
    )
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
        .get('/api/clients/2')
        .expect(200)
    })
  })

  describe('GET /api/clients/:client_id', () => {
    test('Should return 404 on /api/clients/:client_id with inexistent id', async () => {
      await request(app)
        .get('/api/clients/3')
        .expect(404)
    })
  })

  describe('POST /api/clients', () => {
    test('Should return 200 on /api/clients with correct payload', async () => {
      await request(app)
        .post('/api/clients')
        .send(makePostRequest('Cliente POST', 'client_post@hotmail.com'))
        .expect(200)
        .then(response => {
          expect(response.body.name).toBe('Cliente POST')
          expect(response.body.email).toBe('client_post@hotmail.com')
        }).catch(err => {
          console.log(err)
        })
    })
  })
})
