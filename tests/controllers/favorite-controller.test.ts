import request from 'supertest'
import { getConnection, getRepository, Repository } from 'typeorm'
import nock from 'nock'
import { Favorite } from '../../src/app/entities/favorite'
import app from '../../src/config/app'
import SetupDatabase from '../../src/config/setup-database'
import config from '../mocks/database/mock-databaseconfig'
import IFavoritePostRequestDTO from '../../src/app/dtos/services/favorite/favorite-service-post-request-dto'
import { Client } from '../../src/app/entities/client'

const makeFavorite = (clientId?: number, externalProductId?: string): Favorite => {
  const favorite = new Favorite()
  favorite.clientId = clientId || 1
  favorite.externalProductId = externalProductId || '123-123-123'

  return favorite
}

const makeClient = (email?: string): Client => {
  const client = new Client()
  client.email = email || 'client@email.com'
  client.name = 'client'

  return client
}

const makePostRequest = (clientId?: number, externalProductId?: string): IFavoritePostRequestDTO => {
  return {
    clientId: clientId || 1,
    externalProductId: externalProductId || '123-123-123'
  }
}

const mockMagaluShowResponse =
  {
    price: 1699,
    image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
    brand: 'bébé confort',
    id: '123-123-123-123',
    title: 'Cadeira para Auto Iseos Bébé Confort Earth Brown'
  }

describe('Favorite Controller', () => {
  let setupDatabase: SetupDatabase
  let favoriteRepository: Repository<Favorite>
  let clientRepository: Repository<Client>

  beforeEach(async () => {
    setupDatabase = new SetupDatabase(config)
    await setupDatabase.handle()

    favoriteRepository = getRepository(Favorite)
    clientRepository = getRepository(Client)
  })

  afterEach(async () => {
    const conn = getConnection()
    return await conn.close()
  })

  describe('GET /api/favorites', () => {
    test('Should return 200 on /api/favorites?client_id=1', async () => {
      const client = await clientRepository.save(makeClient())
      const favorite = await favoriteRepository.save(makeFavorite(client.id))

      await request(app)
        .get(`/api/favorites?client_id=${client.id}`)
        .expect(200)
        .then(response => {
          expect(response.body).toEqual([favorite])
        })
    })

    test('Should return 400 on /api/favorites with not inform client_id query param', async () => {
      await request(app)
        .get('/api/favorites')
        .expect(400)
    })

    test('Should return 200 on /api/favorites/:favorite_id', async () => {
      const client = await clientRepository.save(makeClient())
      const favorite = await favoriteRepository.save(makeFavorite(client.id))

      await request(app)
        .get(`/api/favorites/${favorite.id}`)
        .expect(200)
    })
  })

  describe('GET /api/favorites/:favorite_id', () => {
    test('Should return 404 on /api/favorites/:favorite_id with inexistent id', async () => {
      await request(app)
        .get('/api/favorites/3')
        .expect(404)
    })
  })

  describe('POST /api/favorites', () => {
    test('Should return 200 on /api/favorites with correct payload', async () => {
      const client = await clientRepository.save(makeClient())

      nock('http://challenge-api.luizalabs.com')
        .get(`/api/product/${mockMagaluShowResponse.id}/`)
        .reply(200, mockMagaluShowResponse)

      const mockRequest = makePostRequest(client.id, mockMagaluShowResponse.id)

      await request(app)
        .post('/api/favorites')
        .send(mockRequest)
        .expect(200)
        .then(response => {
          expect(response.body).toEqual({ ...mockRequest, id: response.body.id })
        })
    })

    test('Should return 400 on /api/favorites with already existing favorite', async () => {
      const client = await clientRepository.save(makeClient())
      const mockRequest = makePostRequest(client.id, mockMagaluShowResponse.id)

      nock('http://challenge-api.luizalabs.com')
        .get(`/api/product/${mockMagaluShowResponse.id}/`)
        .reply(200, mockMagaluShowResponse)

      await favoriteRepository.save(mockRequest)

      await request(app)
        .post('/api/favorites')
        .send(mockRequest)
        .expect(400)
    })

    test('Should return 404 on /api/favorites with inexistent client', async () => {
      const mockRequest = makePostRequest(1, mockMagaluShowResponse.id)

      await request(app)
        .post('/api/favorites')
        .send(mockRequest)
        .expect(404)
    })

    test('Should return 404 on /api/favorites with inexistent product', async () => {
      const client = await clientRepository.save(makeClient())
      const mockRequest = makePostRequest(client.id, mockMagaluShowResponse.id)

      nock('http://challenge-api.luizalabs.com')
        .get(`/api/product/${mockMagaluShowResponse.id}/`)
        .reply(404)

      await request(app)
        .post('/api/favorites')
        .send(mockRequest)
        .expect(404)
    })
  })

  describe('DELETE /api/favorites/:favorite_id', () => {
    test('Should return 200 on /api/favorites/:favorite_id', async () => {
      const client = await clientRepository.save(makeClient())
      const favorite = await favoriteRepository.save(makeFavorite(client.id))

      await request(app)
        .delete(`/api/favorites/${favorite.id}`)
        .expect(200)
    })
  })

  describe('DELETE /api/favorites/:favorite_id', () => {
    test('Should return 404 on /api/favorites/:favorite_id with inexistent favorite_id', async () => {
      await request(app)
        .delete('/api/favorites/100')
        .expect(404)
    })
  })
})
