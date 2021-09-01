import FakeFavoriteRepository from '../mocks/repositories/fake-favorite-repository'
import FavoriteService from '../../src/app/services/favorite-service'
import AppError from '../../src/app/errors/app-error'
import { Favorite } from '../../src/app/entities/favorite'
import FakeClientRepository from '../mocks/repositories/fake-client-repository'
import MagaluProductService from '../../src/app/services/magalu-product-service'
import ClientService from '../../src/app/services/client-service'
import { Client } from '../../src/app/entities/client'

const makeFavorite = (clientId?: number, externalProductId?: string): Favorite => {
  const favorite = new Favorite()
  favorite.clientId = clientId || 1
  favorite.externalProductId = externalProductId || '1bf0f365-fbdd-4e21-9786-da459d78dd1f'

  return favorite
}

const makeClient = (nome?: string, email?: string): Client => {
  const client = new Client()
  client.email = email || 'client@email.com'
  client.name = nome || 'client'

  return client
}

const mockMagaluShowResponse =
  {
    price: 1699,
    image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
    brand: 'bébé confort',
    id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
    title: 'Cadeira para Auto Iseos Bébé Confort Earth Brown'
  }

describe('FavoriteService', () => {
  let fakeFavoriteRepository: FakeFavoriteRepository
  let favoriteService: FavoriteService
  let clientService: ClientService
  let fakeClientRepository: FakeClientRepository
  let magaluProductService: MagaluProductService // TO DO - Mockar

  beforeEach(() => {
    fakeFavoriteRepository = new FakeFavoriteRepository()
    fakeClientRepository = new FakeClientRepository()
    magaluProductService = new MagaluProductService()
    favoriteService = new FavoriteService(fakeFavoriteRepository, fakeClientRepository, magaluProductService)
    clientService = new ClientService(fakeClientRepository)
  })

  it('should be list of favorites by client', async () => {
    const client = await clientService.create(makeClient())

    jest.spyOn(magaluProductService, 'show').mockImplementationOnce(
      async (): Promise<any> => await Promise.resolve(mockMagaluShowResponse)
    )

    await favoriteService.create(makeFavorite(client.id))

    const listOfFavorites = await favoriteService.index(client.id)

    expect(listOfFavorites).toHaveLength(1)
  })

  it('should be return one favorite', async () => {
    const client = await clientService.create(makeClient())

    jest.spyOn(magaluProductService, 'show').mockImplementationOnce(
      async (): Promise<any> => await Promise.resolve(mockMagaluShowResponse)
    )

    const favorite = await favoriteService.create(makeFavorite(client.id))

    const result = await favoriteService.show(favorite.id.toString())

    expect(result).toHaveProperty('id')
    expect(result.id).toBe(favorite.id)
  })

  it('should be return 404 when try get inexistent favorite', async () => {
    await expect(favoriteService.show('100'))
      .rejects.toEqual(new AppError('favorite not found', 404))
  })

  it('should be insert one favorite', async () => {
    const client = await clientService.create(makeClient())
    const mockFavorite = makeFavorite(client.id)

    jest.spyOn(magaluProductService, 'show').mockImplementationOnce(
      async (): Promise<any> => await Promise.resolve(mockMagaluShowResponse)
    )

    const favorite = await favoriteService.create(mockFavorite)

    expect(favorite).toEqual({ ...mockFavorite, id: favorite.id })
  })

  it('should be return 400 when try insert favorite with same product', async () => {
    const productId = mockMagaluShowResponse.id
    const client = await clientService.create(makeClient())

    jest.spyOn(magaluProductService, 'show').mockImplementationOnce(
      async (): Promise<any> => await Promise.resolve(mockMagaluShowResponse)
    )

    await favoriteService.create(makeFavorite(client.id, productId))

    jest.spyOn(magaluProductService, 'show').mockImplementationOnce(
      async (): Promise<any> => await Promise.resolve(mockMagaluShowResponse)
    )

    await expect(favoriteService.create(makeFavorite(client.id, productId)))
      .rejects.toEqual(new AppError('favorite already exists'))
  })

  it('should be return 404 when try insert favorite with inexistent client', async () => {
    jest.spyOn(magaluProductService, 'show').mockImplementationOnce(
      async (): Promise<any> => await Promise.resolve(mockMagaluShowResponse)
    )

    await expect(favoriteService.create(makeFavorite(100)))
      .rejects.toEqual(new AppError('client not found', 404))
  })

  it('should be return 404 when try insert favorite with inexistent magalu product', async () => {
    const client = await clientService.create(makeClient())

    jest.spyOn(magaluProductService, 'show').mockImplementationOnce(
      async (): Promise<any> => await Promise.reject(
        new AppError('magalu product not found', 404)
      )
    )

    await expect(favoriteService.create(makeFavorite(client.id, 'id_invalido')))
      .rejects.toEqual(new AppError('magalu product not found', 404))
  })

  it('should be delete one favorite', async () => {
    const client = await clientService.create(makeClient())

    jest.spyOn(magaluProductService, 'show').mockImplementationOnce(
      async (): Promise<any> => await Promise.resolve(mockMagaluShowResponse)
    )

    const favorite = await favoriteService.create(makeFavorite(client.id))

    const result = await favoriteService.delete(favorite.id)
    expect(result).toEqual('favorite successfully deleted')
  })

  it('should be return 400 when try delete a favorite inexistent', async () => {
    await expect(favoriteService.delete(100))
      .rejects.toEqual(new AppError('favorite not exists', 404))
  })
})
