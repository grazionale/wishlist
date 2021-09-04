import { getRepository, Repository } from 'typeorm'
import { Favorite } from '../entities/favorite'
import IFavoriteIndexResponseDTO from '../dtos/repositories/favorite/favorite-repository-index-response-dto'
import IFavoritePostRequestDTO from '../dtos/repositories/favorite/favorite-repository-post-request-dto'
import IFavoritePostResponseDTO from '../dtos/repositories/favorite/favorite-repository-post-response-dto'
import IFavoriteShowResponseDTO from '../dtos/repositories/favorite/favorite-repository-show-response-dto'
import { IFavoriteRepository } from '../interfaces/repositories/favorite/favorite-repository'

class FavoriteRepository implements IFavoriteRepository {
  private readonly ormRepository: Repository<Favorite>

  constructor () {
    this.ormRepository = getRepository(Favorite)
  }

  public async index (clientId: number): Promise<IFavoriteIndexResponseDTO[]> {
    const listOfFavorites = await this.ormRepository.find({ clientId: clientId })

    return listOfFavorites
  }

  public async show (favoriteId: string): Promise<IFavoriteShowResponseDTO | undefined> {
    const favorite = await this.ormRepository.findOne(favoriteId)

    return favorite
  }

  public async verifyAlreadyExists (clientId: number, productId: number): Promise<boolean> {
    const favorite = await this.ormRepository.findOne({
      clientId: clientId,
      productId: productId
    })

    return !!favorite
  }

  public async create (favorite: IFavoritePostRequestDTO): Promise<IFavoritePostResponseDTO> {
    const favoriteSaved = await this.ormRepository.save(favorite)

    return favoriteSaved
  }

  public async delete (favoriteId: number): Promise<string> {
    await this.ormRepository.delete(favoriteId)
    return 'Favorite successfully deleted'
  }
}

export default FavoriteRepository
