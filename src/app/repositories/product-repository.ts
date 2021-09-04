import { getRepository, Repository } from 'typeorm'
import { Product } from '../entities/product'
import IProductShowResponseDTO from '../dtos/repositories/product/product-repository-show-response-dto'
import { IProductRepository } from '../interfaces/repositories/product/product-repository'
import IProductCreateRequestDTO from '../dtos/repositories/product/product-repository-create-request-dto'
import IProductCreateResponseDTO from '../dtos/repositories/product/product-repository-create-response-dto'
import IProductUpdateRequestDTO from '../dtos/repositories/product/product-repository-update-request-dto'
import IProductUpdateResponseDTO from '../dtos/repositories/product/product-repository-update-response-dto'

class ProductRepository implements IProductRepository {
  private readonly ormRepository: Repository<Product>

  constructor () {
    this.ormRepository = getRepository(Product)
  }

  public async findByIntegrationId (integrationId: string): Promise<IProductShowResponseDTO | undefined> {
    const product = await this.ormRepository.findOne({ integrationId: integrationId })

    return product
  }

  public async create (product: IProductCreateRequestDTO): Promise<IProductCreateResponseDTO> {
    const productSaved = await this.ormRepository.save(product)

    return productSaved
  }

  public async update (product: IProductUpdateRequestDTO): Promise<IProductUpdateResponseDTO> {
    const productSaved = await this.ormRepository.save(product)

    return productSaved
  }
}

export default ProductRepository
