import AppError from '../errors/app-error'
import IFavoritePostResponseDTO from '../dtos/services/favorite/favorite-service-post-response-dto'
import { IFavoriteRepository } from '../interfaces/repositories/favorite/favorite-repository'
import IFavoriteIndexResponseDTO from '../dtos/services/favorite/favorite-service-index-response-dto'
import IFavoritePostRequestDTO from '../dtos/services/favorite/favorite-service-post-request-dto'
import IFavoriteShowResponseDTO from '../dtos/services/favorite/favorite-service-show-response-dto'
import { IClientRepository } from '../interfaces/repositories/client/client-repository'
import MagaluProductService from './magalu-product-service'
import { IProductRepository } from '../interfaces/repositories/product/product-repository'

class FavoriteService {
  private readonly favoriteRepository: IFavoriteRepository
  private readonly clientRepository: IClientRepository
  private readonly productRepository: IProductRepository
  private readonly magaluProductService: MagaluProductService

  constructor (
    favoriteRepository: IFavoriteRepository,
    clientRepository: IClientRepository,
    productRepository: IProductRepository,
    magaluProductService: MagaluProductService
  ) {
    this.favoriteRepository = favoriteRepository
    this.clientRepository = clientRepository
    this.productRepository = productRepository
    this.magaluProductService = magaluProductService
  }

  public async index (clientId: number): Promise<IFavoriteIndexResponseDTO[]> {
    const listOfFavorites = await this.favoriteRepository.index(clientId)

    return listOfFavorites
  }

  public async show (favoriteId: string): Promise<IFavoriteShowResponseDTO> {
    const favorite = await this.favoriteRepository.show(favoriteId)

    if (!favorite) {
      throw new AppError('favorite not found', 404)
    }

    return favorite
  }

  public async create (favorite: IFavoritePostRequestDTO): Promise<IFavoritePostResponseDTO> {
    const findClient = await this.clientRepository.show(favorite.clientId.toString())

    if (!findClient) {
      throw new AppError('client not found', 404)
    }

    const magaluProduct = await this.getProductOnMagalu(favorite.externalProductId)

    const productFind = await this.productRepository.findByIntegrationId(favorite.externalProductId)

    let product = productFind

    if (product) {
      const favoriteAlreadyExists = await this.favoriteRepository.verifyAlreadyExists(favorite.clientId, product?.id)

      if (favoriteAlreadyExists) {
        throw new AppError('favorite already exists', 400)
      }
    } else {
      product = await this.productRepository.create({
        integrationId: magaluProduct.id,
        title: magaluProduct.title,
        price: magaluProduct.price,
        image: magaluProduct.image
      })
    }

    const favoriteSaved = await this.favoriteRepository.create({
      clientId: findClient.id,
      productId: product.id
    })

    return favoriteSaved
  }

  public async delete (favoriteId: number): Promise<string> {
    const findFavorite = await this.favoriteRepository.show(favoriteId.toString())

    if (!findFavorite) {
      throw new AppError('favorite not exists', 404)
    }

    await this.favoriteRepository.delete(favoriteId)

    return 'favorite successfully deleted'
  }

  private async getProductOnMagalu (externalProductId: string): Promise<any> {
    const findProduct = await this.magaluProductService.show(externalProductId)
    return findProduct
  }
}

export default FavoriteService
