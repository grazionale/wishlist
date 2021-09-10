import { getRepository, Repository } from 'typeorm'
import { Product } from '../../domain/entities/product'
import { IProductRepository } from '../repositories/product-repository'

class ProductRepository implements IProductRepository {
  private readonly ormRepository: Repository<Product>

  constructor () {
    this.ormRepository = getRepository(Product)
  }

  public async findByIntegrationId (integrationId: string): Promise<IProductRepository.FindByIntegrationIdResult | undefined> {
    const product = await this.ormRepository.findOne({ integrationId: integrationId })

    return product
  }

  public async create (product: IProductRepository.CreateParams): Promise<IProductRepository.CreateResult> {
    const productSaved = await this.ormRepository.save(product)

    return productSaved
  }

  public async update (product: IProductRepository.UpdateParams): Promise<IProductRepository.UpdateResult> {
    const productSaved = await this.ormRepository.save(product)

    return productSaved
  }
}

export default ProductRepository
