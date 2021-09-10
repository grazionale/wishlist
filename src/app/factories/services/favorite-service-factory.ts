import FavoriteService from '../../services/favorite-service'
import FavoriteRepository from '../../repositories/favorite-repository'
import ClientRepository from '../../repositories/client-repository'
import MagaluProductService from '../../services/magalu-product-service'
import ProductRepository from '../../../infra/typeorm/product-repository'

export const makeFavoriteService = (): FavoriteService => {
  const favoriteRepository = new FavoriteRepository()
  const clientRepository = new ClientRepository()
  const productRepository = new ProductRepository()
  const magaluProductService = new MagaluProductService()

  return new FavoriteService(favoriteRepository, clientRepository, productRepository, magaluProductService)
}
