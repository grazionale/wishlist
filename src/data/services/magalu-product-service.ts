import AppError from '../../app/errors/app-error'
import { IMagaluProductService } from '../../domain/services/magalu-product-service'
import apiMagalu from '../../main/config/setup-api-magalu'

class MagaluProductService implements IMagaluProductService {
  public async show (externalProductId: string): Promise<any> {
    try {
      const result = await apiMagalu.get(`/api/product/${externalProductId}/`)
      return result.data
    } catch (error) {
      if (error.response.status === 404) {
        throw new AppError('magalu product not found', 404)
      }
      throw new AppError('internal server error', 500)
    }
  }
}

export default MagaluProductService
