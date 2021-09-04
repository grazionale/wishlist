import AppError from '../errors/app-error'
import { IProductRepository } from '../interfaces/repositories/product/product-repository'
import IProductCreateRequestDTO from '../dtos/services/product/product-service-create-request-dto'
import IProductCreateResponseDTO from '../dtos/services/product/product-service-create-response-dto'

class ProductService {
  private readonly productRepository: IProductRepository

  constructor (
    productRepository: IProductRepository
  ) {
    this.productRepository = productRepository
  }

  public async create (product: IProductCreateRequestDTO): Promise<IProductCreateResponseDTO> {
    const alreadyExists = await this.productRepository.findByIntegrationId(product.integrationId)

    if (alreadyExists) {
      throw new AppError('product already exists', 400)
    }
    const productSaved = await this.productRepository.create(product)

    return productSaved
  }
}

export default ProductService
