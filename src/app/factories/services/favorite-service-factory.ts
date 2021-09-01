import FavoriteService from '../../services/favorite-service'
import FavoriteRepository from '../../repositories/favorite-repository'
import ClientRepository from '../../repositories/client-repository'
import MagaluProductService from '../../services/magalu-product-service'

export const makeFavoriteService = (): FavoriteService => {
  const favoriteRepository = new FavoriteRepository()
  const clientRepository = new ClientRepository()
  const magaluProductService = new MagaluProductService()

  return new FavoriteService(favoriteRepository, clientRepository, magaluProductService)
}
