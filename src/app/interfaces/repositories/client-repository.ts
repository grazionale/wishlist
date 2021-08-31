import IClientShowDTO from '../../dtos/services/client-service-show-dto'
import IClientIndexDTO from '../../dtos/repositories/client-repository-index-dto'
import IClientPostRequestDTO from '../../dtos/repositories/client-repository-post-request-dto'
import IClientPostResponseDTO from '../../dtos/repositories/client-repository-post-response-dto'

export interface IClientRepository {
  index: () => Promise<IClientIndexDTO[]>
  show: (clientId: string) => Promise<IClientShowDTO | undefined>
  findByEmail: (clientEmail: string) => Promise<IClientShowDTO | undefined>
  create: (client: IClientPostRequestDTO) => Promise<IClientPostResponseDTO>
}
