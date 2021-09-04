import AppError from '../errors/app-error'
import { IProductRepository } from '../interfaces/repositories/product/product-repository'
import IProductCreateRequestDTO from '../dtos/services/product/product-service-create-request-dto'
import IProductCreateResponseDTO from '../dtos/services/product/product-service-create-response-dto'
import IProductUpdateRequestDTO from '../dtos/services/product/product-service-update-request-dto'
import IProductUpdateResponseDTO from '../dtos/services/product/product-service-update-response-dto'

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

  public async update (product: IProductUpdateRequestDTO): Promise<IProductUpdateResponseDTO> {
    const findProduct = await this.productRepository.findByIntegrationId(product.integrationId)

    if (!findProduct) {
      throw new AppError('product not exists', 404)
    }

    const productSaved = await this.productRepository.update({ ...product, id: findProduct.id })

    return productSaved
  }
}

export default ProductService
