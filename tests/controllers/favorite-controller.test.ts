import request from 'supertest'
import { getConnection, getRepository, Repository } from 'typeorm'
import nock from 'nock'
import { Favorite } from '../../src/app/entities/favorite'
import app from '../../src/main/config/app'
import SetupDatabase from '../../src/main/config/setup-database'
import config from '../mocks/database/mock-databaseconfig'
import IFavoritePostRequestDTO from '../../src/app/dtos/services/favorite/favorite-service-post-request-dto'
import { Client } from '../../src/app/entities/client'
import UserService from '../../src/app/services/user-service'
import UserRepository from '../../src/infra/typeorm/user-repository'
import AuthService from '../../src/data/services/auth-service'
import IAuthServiceAuthResponseDTO from '../../src/app/dtos/services/auth-service/auth-service-auth-response-dto'
import { Product } from '../../src/app/entities/product'
import IProductCreateRequestDTO from '../../src/app/dtos/repositories/product/product-repository-create-request-dto'
import ClientService from '../../src/app/services/client-service'
import { makeClientService } from '../../src/app/factories/services/client-service-factory'
import ProductService from '../../src/app/services/product-service'
import { makeProductService } from '../../src/app/factories/services/product-service-factory'

const makeFavorite = (clientId?: number, productId?: number): Favorite => {
  const favorite = new Favorite()
  favorite.clientId = clientId || 1
  favorite.productId = productId || 1

  return favorite
}

const makeClient = (email?: string): Client => {
  const client = new Client()
  client.email = email || 'client@email.com'
  client.name = 'client'

  return client
}

const makeProduct = (productRequest?: IProductCreateRequestDTO): Product => {
  const product = new Product()
  product.integrationId = productRequest?.integrationId || '123-123-123'
  product.title = productRequest?.title || 'Boneca Molenga'
  product.price = productRequest?.price || 100.00
  product.image = productRequest?.image || 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg'

  return product
}

const makePostRequest = (clientId?: number, externalProductId?: string): IFavoritePostRequestDTO => {
  return {
    clientId: clientId || 1,
    externalProductId: externalProductId || '123-123-123'
  }
}

const mockMagaluShowResponse = {
  price: 1699,
  image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
  brand: 'bébé confort',
  id: '123-123-123-123',
  title: 'Cadeira para Auto Iseos Bébé Confort Earth Brown'
}

const mockUser = {
  username: 'magalu', password: '123456'
}

describe('Favorite Controller', () => {
  let setupDatabase: SetupDatabase
  let favoriteRepository: Repository<Favorite>
  let clientService: ClientService
  let productService: ProductService
  let userService: UserService
  let userRepsitory: UserRepository
  let authService: AuthService
  let authResponse: IAuthServiceAuthResponseDTO

  beforeEach(async () => {
    setupDatabase = new SetupDatabase(config)
    await setupDatabase.handle()

    userRepsitory = new UserRepository()
    userService = new UserService(userRepsitory)
    authService = new AuthService(userRepsitory)

    favoriteRepository = getRepository(Favorite)
    clientService = makeClientService()
    productService = makeProductService()

    await userService.create(mockUser)
    authResponse = await authService.auth({ username: mockUser.username, password: mockUser.password })
  })

  afterEach(async () => {
    const conn = getConnection()
    return await conn.close()
  })

  describe('GET /api/favorites', () => {
    test('Should return 200 on /api/favorites?client_id=1', async () => {
      const client = await clientService.create(makeClient())
      const product = await productService.create(makeProduct())
      await favoriteRepository.save(makeFavorite(client.id, product.id))

      await request(app)
        .get(`/api/favorites?client_id=${client.id}`)
        .set('Authorization', `Bearer ${authResponse.accessToken}`)
        .expect(200)
        .then(response => {
          expect(response.body).toHaveLength(1)
        })
    })

    test('Should return 400 on /api/favorites with not inform client_id query param', async () => {
      await request(app)
        .get('/api/favorites')
        .set('Authorization', `Bearer ${authResponse.accessToken}`)
        .expect(400)
    })

    test('Should return 200 on /api/favorites/:favorite_id', async () => {
      const client = await clientService.create(makeClient())
      const product = await productService.create(makeProduct())
      const favorite = await favoriteRepository.save(makeFavorite(client.id, product.id))

      await request(app)
        .get(`/api/favorites/${favorite.id}`)
        .set('Authorization', `Bearer ${authResponse.accessToken}`)
        .expect(200)
    })
  })

  describe('GET /api/favorites/:favorite_id', () => {
    test('Should return 404 on /api/favorites/:favorite_id with inexistent id', async () => {
      await request(app)
        .get('/api/favorites/3')
        .set('Authorization', `Bearer ${authResponse.accessToken}`)
        .expect(404)
    })
  })

  describe('POST /api/favorites', () => {
    test('Should return 200 on /api/favorites with correct payload', async () => {
      const client = await clientService.create(makeClient())

      const product = await productService.create(makeProduct({
        integrationId: mockMagaluShowResponse.id,
        title: mockMagaluShowResponse.title,
        price: mockMagaluShowResponse.price,
        image: mockMagaluShowResponse.image
      }))

      nock('http://challenge-api.luizalabs.com')
        .get(`/api/product/${mockMagaluShowResponse.id}/`)
        .reply(200, mockMagaluShowResponse)

      const mockRequest = makePostRequest(client.id, mockMagaluShowResponse.id)

      await request(app)
        .post('/api/favorites')
        .send(mockRequest)
        .set('Authorization', `Bearer ${authResponse.accessToken}`)
        .expect(200)
        .then(response => {
          expect(response.body).toEqual({ id: response.body.id, clientId: mockRequest.clientId, productId: product.id })
        })
    })

    test('Should return 400 on /api/favorites with already existing favorite', async () => {
      const client = await clientService.create(makeClient())

      const product = await productService.create(makeProduct({
        integrationId: mockMagaluShowResponse.id,
        title: mockMagaluShowResponse.title,
        price: mockMagaluShowResponse.price,
        image: mockMagaluShowResponse.image
      }))

      nock('http://challenge-api.luizalabs.com')
        .get(`/api/product/${mockMagaluShowResponse.id}/`)
        .reply(200, mockMagaluShowResponse)

      const mockRequest = makePostRequest(client.id, mockMagaluShowResponse.id)

      await favoriteRepository.save(makeFavorite(client.id, product.id))

      await request(app)
        .post('/api/favorites')
        .set('Authorization', `Bearer ${authResponse.accessToken}`)
        .send(mockRequest)
        .expect(400)
    })

    test('Should return 404 on /api/favorites with inexistent client', async () => {
      const mockRequest = makePostRequest(1, mockMagaluShowResponse.id)

      await request(app)
        .post('/api/favorites')
        .set('Authorization', `Bearer ${authResponse.accessToken}`)
        .send(mockRequest)
        .expect(404)
    })

    test('Should return 404 on /api/favorites with inexistent product', async () => {
      const client = await clientService.create(makeClient())
      const mockRequest = makePostRequest(client.id, mockMagaluShowResponse.id)

      nock('http://challenge-api.luizalabs.com')
        .get(`/api/product/${mockMagaluShowResponse.id}/`)
        .reply(404)

      await request(app)
        .post('/api/favorites')
        .set('Authorization', `Bearer ${authResponse.accessToken}`)
        .send(mockRequest)
        .expect(404)
    })
  })

  describe('DELETE /api/favorites/:favorite_id', () => {
    test('Should return 200 on /api/favorites/:favorite_id', async () => {
      const client = await clientService.create(makeClient())
      const product = await productService.create(makeProduct())
      const favorite = await favoriteRepository.save(makeFavorite(client.id, product.id))

      await request(app)
        .delete(`/api/favorites/${favorite.id}`)
        .set('Authorization', `Bearer ${authResponse.accessToken}`)
        .expect(200)
    })

    test('Should return 404 on /api/favorites/:favorite_id with inexistent favorite_id', async () => {
      await request(app)
        .delete('/api/favorites/100')
        .set('Authorization', `Bearer ${authResponse.accessToken}`)
        .expect(404)
    })
  })
})
