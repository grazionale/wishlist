import { Favorite } from '../../../src/app/entities/favorite'
import IFavoriteIndexResponseDTO from '../../../src/app/dtos/repositories/favorite/favorite-repository-index-response-dto'
import IFavoritePostRequestDTO from '../../../src/app/dtos/repositories/favorite/favorite-repository-post-request-dto'
import IFavoritePostResponseDTO from '../../../src/app/dtos/repositories/favorite/favorite-repository-post-response-dto'
import IFavoriteShowResponseDTO from '../../../src/app/dtos/repositories/favorite/favorite-repository-show-response-dto'
import { IFavoriteRepository } from '../../../src/app/interfaces/repositories/favorite/favorite-repository'

class FakeFavoriteRepository implements IFavoriteRepository {
  private favorites: Favorite[] = []

  public async index (): Promise<IFavoriteIndexResponseDTO[]> {
    return this.favorites
  }

  public async show (favoriteId: string): Promise<IFavoriteShowResponseDTO | undefined> {
    return this.favorites.find(favorite => favorite.id.toString() === favoriteId)
  }

  public async create (favoriteData: IFavoritePostRequestDTO): Promise<IFavoritePostResponseDTO> {
    const favorite = new Favorite()
    Object.assign(favorite, { id: 1, ...favoriteData })
    this.favorites.push(favorite)
    return favorite
  }

  public async verifyAlreadyExists (clientId: number, externalProductId: string): Promise<IFavoriteShowResponseDTO | undefined> {
    const findFavorite = this.favorites.find(favorite =>
      favorite.clientId === clientId &&
      favorite.externalProductId === externalProductId
    )
    return findFavorite
  }

  public async delete (favoriteId: number): Promise<string> {
    this.favorites = this.favorites.filter(favorite => favorite.id !== favoriteId)
    return 'Favorite successfully deleted'
  }
}

export default FakeFavoriteRepository
