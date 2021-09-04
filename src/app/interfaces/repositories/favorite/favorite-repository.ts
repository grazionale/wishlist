import IFavoriteShowResponseDTO from '../../../dtos/repositories/favorite/favorite-repository-show-response-dto'
import IFavoriteIndexResponseDTO from '../../../dtos/repositories/favorite/favorite-repository-index-response-dto'
import IFavoritePostRequestDTO from '../../../dtos/repositories/favorite/favorite-repository-post-request-dto'
import IFavoritePostResponseDTO from '../../../dtos/repositories/favorite/favorite-repository-post-response-dto'

export interface IFavoriteRepository {
  index: (clientId: number) => Promise<IFavoriteIndexResponseDTO[]>
  show: (favoriteId: string) => Promise<IFavoriteShowResponseDTO | undefined>
  verifyAlreadyExists: (clientId: number, productId: number) => Promise<boolean>
  create: (favorite: IFavoritePostRequestDTO) => Promise<IFavoritePostResponseDTO>
  delete: (favoriteId: number) => Promise<string>
}
