import { IProductService } from '../../domain/services/product-service'
import { IProductRepository } from '../../infra/repositories/product-repository'
import AppError from '../../app/errors/app-error'

class ProductService implements IProductService {
  private readonly productRepository: IProductRepository

  constructor (
    productRepository: IProductRepository
  ) {
    this.productRepository = productRepository
  }

  public async create (product: IProductService.CreateParams): Promise<IProductService.CreateResult> {
    const alreadyExists = await this.productRepository.findByIntegrationId(product.integrationId)

    if (alreadyExists) {
      throw new AppError('product already exists', 400)
    }
    const productSaved = await this.productRepository.create(product)

    return productSaved
  }

  public async update (product: IProductService.UpdateParams): Promise<IProductService.UpdateResult> {
    const findProduct = await this.productRepository.findByIntegrationId(product.integrationId)

    if (!findProduct) {
      throw new AppError('product not exists', 404)
    }

    const productSaved = await this.productRepository.update({ ...product, id: findProduct.id })

    return productSaved
  }
}

export default ProductService
