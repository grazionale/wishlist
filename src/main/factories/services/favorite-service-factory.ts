import ProductRepository from '../../../infra/typeorm/product-repository'
import ClientRepository from '../../../infra/typeorm/client-repository'
import MagaluProductService from '../../../data/services/magalu-product-service'
import FavoriteRepository from '../../../infra/typeorm/favorite-repository'
import FavoriteService from '../../../data/services/favorite-service'

export const makeFavoriteService = (): FavoriteService => {
  const favoriteRepository = new FavoriteRepository()
  const clientRepository = new ClientRepository()
  const productRepository = new ProductRepository()
  const magaluProductService = new MagaluProductService()

  return new FavoriteService(favoriteRepository, clientRepository, productRepository, magaluProductService)
}
