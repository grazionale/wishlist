import IProductCreateRequestDTO from '../../../dtos/repositories/product/product-repository-create-request-dto'
import IProductCreateResponseDTO from '../../../dtos/repositories/product/product-repository-create-response-dto'
import IProductShowResponseDTO from '../../../dtos/repositories/product/product-repository-show-response-dto'
import IProductUpdateRequestDTO from '../../../dtos/repositories/product/product-repository-update-request-dto'
import IProductUpdateResponseDTO from '../../../dtos/repositories/product/product-repository-update-response-dto'

export interface IProductRepository {
  findByIntegrationId: (integrationId: string) => Promise<IProductShowResponseDTO | undefined>
  create: (product: IProductCreateRequestDTO) => Promise<IProductCreateResponseDTO>
  update: (product: IProductUpdateRequestDTO) => Promise<IProductUpdateResponseDTO>
}
