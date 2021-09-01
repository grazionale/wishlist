import IClientShowResponseDTO from '../../dtos/services/client-service-show-response-dto'
import IClientIndexResponseDTO from '../../dtos/repositories/client-repository-index-response-dto'
import IClientPostRequestDTO from '../../dtos/repositories/client-repository-post-request-dto'
import IClientPostResponseDTO from '../../dtos/repositories/client-repository-post-response-dto'

export interface IClientRepository {
  index: () => Promise<IClientIndexResponseDTO[]>
  show: (clientId: string) => Promise<IClientShowResponseDTO | undefined>
  findByEmail: (clientEmail: string) => Promise<IClientShowResponseDTO | undefined>
  create: (client: IClientPostRequestDTO) => Promise<IClientPostResponseDTO>
}
