import ProductRepository from '../../repositories/product-repository'
import ProductService from '../../services/product-service'

export const makeProductService = (): ProductService => {
  const productRepository = new ProductRepository()

  return new ProductService(productRepository)
}
