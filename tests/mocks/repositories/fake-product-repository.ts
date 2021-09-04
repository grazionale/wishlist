import { Product } from '../../../src/app/entities/product'
import IProductCreateRequestDTO from '../../../src/app/dtos/repositories/product/product-repository-create-request-dto'
import IProductCreateResponseDTO from '../../../src/app/dtos/repositories/product/product-repository-create-response-dto'
import IProductShowResponseDTO from '../../../src/app/dtos/repositories/product/product-repository-show-response-dto'
import { IProductRepository } from '../../../src/app/interfaces/repositories/product/product-repository'
import IProductUpdateRequestDTO from '../../../src/app/dtos/repositories/product/product-repository-update-request-dto'
import IProductUpdateResponseDTO from '../../../src/app/dtos/repositories/product/product-repository-update-response-dto'

class FakeProductRepository implements IProductRepository {
  private readonly products: Product[] = []

  public async show (productId: string): Promise<IProductShowResponseDTO | undefined> {
    return this.products.find(product => product.id.toString() === productId)
  }

  public async create (productData: IProductCreateRequestDTO): Promise<IProductCreateResponseDTO> {
    const product = new Product()
    Object.assign(product, { id: 1, ...productData })
    this.products.push(product)
    return product
  }

  public async update (productData: IProductUpdateRequestDTO): Promise<IProductUpdateResponseDTO> {
    const findProduct = this.products.find(product => product.integrationId === productData.integrationId)
    if (findProduct) {
      Object.assign(findProduct, { ...productData })
      this.products.push(findProduct)
      return findProduct
    }
    this.products.push({ favorites: [], ...productData })
    return productData
  }

  public async findByIntegrationId (integrationId: string): Promise<IProductShowResponseDTO | undefined> {
    const findProduct = this.products.find(product => product.integrationId === integrationId)
    return findProduct
  }
}

export default FakeProductRepository
