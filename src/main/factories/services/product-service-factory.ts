import ProductService from '../../../data/services/product-service'
import ProductRepository from '../../../infra/typeorm/product-repository'

export const makeProductService = (): ProductService => {
  const productRepository = new ProductRepository()

  return new ProductService(productRepository)
}
