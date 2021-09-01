import MagaluProductService from '../../src/app/services/magalu-product-service'
import apiMagalu from '../../src/config/setup-api-magalu'

const mockMagaluShowResponse =
  {
    price: 1699,
    image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
    brand: 'bébé confort',
    id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
    title: 'Cadeira para Auto Iseos Bébé Confort Earth Brown'
  }

describe('FavoriteService', () => {
  let magaluProductService: MagaluProductService

  beforeEach(() => {
    magaluProductService = new MagaluProductService()
  })

  it('should be return one product', async () => {
    jest.spyOn(apiMagalu, 'get').mockImplementationOnce(
      async (): Promise<any> => await Promise.resolve({ data: mockMagaluShowResponse })
    )

    const product = await magaluProductService.show('123-123-123-123')

    expect(product).toEqual(mockMagaluShowResponse)
  })
})
