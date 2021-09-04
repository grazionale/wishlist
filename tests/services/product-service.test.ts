import IProductCreateRequestDTO from '../../src/app/dtos/repositories/product/product-repository-create-request-dto'
import AppError from '../../src/app/errors/app-error'
import ProductService from '../../src/app/services/product-service'
import FakeProductRepository from '../mocks/repositories/fake-product-repository'

const makeProductCreateRequest = (ingreationId?: string, title?: string, price?: number, image?: string): IProductCreateRequestDTO => {
  return {
    integrationId: ingreationId || '123-123-123-123',
    title: title || 'title',
    price: price || 100.00,
    image: image || 'http://image.com.br'
  }
}

describe('ProductService', () => {
  let productService: ProductService
  let fakeProductRepository: FakeProductRepository

  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository()
    productService = new ProductService(fakeProductRepository)
  })

  it('should be insert one product', async () => {
    const request = makeProductCreateRequest()

    const product = await productService.create(request)

    expect(product).toEqual({ ...request, id: product.id })
  })

  it('should be not insert one product with already created', async () => {
    const request = makeProductCreateRequest()
    await productService.create(request)

    await expect(
      productService.create(request)
    ).rejects.toEqual(new AppError('product already exists'))
  })
})
