import AppError from '../errors/app-error'
import IFavoritePostResponseDTO from '../dtos/services/favorite/favorite-service-post-response-dto'
import { IFavoriteRepository } from '../interfaces/repositories/favorite/favorite-repository'
import IFavoriteIndexResponseDTO from '../dtos/services/favorite/favorite-service-index-response-dto'
import IFavoritePostRequestDTO from '../dtos/services/favorite/favorite-service-post-request-dto'
import IFavoriteShowResponseDTO from '../dtos/services/favorite/favorite-service-show-response-dto'
import { IClientRepository } from '../interfaces/repositories/client/client-repository'
import MagaluProductService from './magalu-product-service'

class FavoriteService {
  private readonly favoriteRepository: IFavoriteRepository
  private readonly clientRepository: IClientRepository
  private readonly magaluProductService: MagaluProductService

  constructor (
    favoriteRepository: IFavoriteRepository,
    clientRepository: IClientRepository,
    magaluProductService: MagaluProductService
  ) {
    this.favoriteRepository = favoriteRepository
    this.clientRepository = clientRepository
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

    await this.verifyProductExistsOnMagalu(favorite.externalProductId)

    const alreadyExists = await this.favoriteRepository.verifyAlreadyExists(favorite.clientId, favorite.externalProductId)

    if (alreadyExists) {
      throw new AppError('favorite already exists', 400)
    }

    const favoriteSaved = await this.favoriteRepository.create(favorite)

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

  private async verifyProductExistsOnMagalu (externalProductId: string): Promise<boolean> {
    const findProduct = await this.magaluProductService.show(externalProductId)
    return !!findProduct
  }
}

export default FavoriteService
