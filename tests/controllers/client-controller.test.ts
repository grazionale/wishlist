import request from 'supertest'
import { getConnection, getRepository, Repository } from 'typeorm'
import { Client } from '../../src/app/entities/client'
import app from '../../src/config/app'
import SetupDatabase from '../../src/config/setup-database'
import config from '../mocks/database/mock-databaseconfig'
import IClientPostRequestDTO from '../../src/app/dtos/services/client/client-service-post-request-dto'
import IClientPutRequestDTO from '../../src/app/dtos/repositories/client/client-repository-put-request-dto'

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

const makePutRequest = (id?: number, name?: string, email?: string): IClientPutRequestDTO => {
  return {
    id: id || 1,
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
        })
    })
  })

  describe('POST /api/clients', () => {
    test('Should return 400 on /api/clients with correct payload but already existing client', async () => {
      await request(app)
        .post('/api/clients')
        .send(makePostRequest('Cliente POST', 'client_post@hotmail.com'))
        .expect(200)

      await request(app)
        .post('/api/clients')
        .send(makePostRequest('Cliente POST', 'client_post@hotmail.com'))
        .expect(400)
    })
  })

  describe('PUT /api/clients/:client_id', () => {
    test('Should return 200 on /api/clients/:client_id with correct payload and client_id', async () => {
      const clientRequest = makePutRequest()

      await request(app)
        .put(`/api/clients/${clientRequest.id}`)
        .send(clientRequest)
        .expect(200)
        .then(response => {
          expect(response.body).toEqual(clientRequest)
        })
    })
  })

  describe('PUT /api/clients/:client_id', () => {
    test('Should return 404 on /api/clients/:client_id with inexistent client_id', async () => {
      const clientRequest = makePutRequest()

      await request(app)
        .put('/api/clients/100')
        .send(clientRequest)
        .expect(404)
    })
  })

  describe('DELETE /api/clients/:client_id', () => {
    test('Should return 200 on /api/clients/:client_id', async () => {
      await request(app)
        .delete('/api/clients/1')
        .expect(200)
    })
  })

  describe('DELETE /api/clients/:client_id', () => {
    test('Should return 404 on /api/clients/:client_id with inexistent client_id', async () => {
      await request(app)
        .delete('/api/clients/100')
        .expect(404)
    })
  })
})
