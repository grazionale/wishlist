import IClientShowDTO from '../../services/dtos/client-service-show-dto'
import IClientIndexDTO from '../dtos/client-repository-index-dto'
import IClientPostRequestDTO from '../dtos/client-repository-post-request-dto'
import IClientPostResponseDTO from '../dtos/client-repository-post-response-dto'

export interface IClientRepository {
  index: () => Promise<IClientIndexDTO[]>
  show: (clientId: string) => Promise<IClientShowDTO | undefined>
  findByEmail: (clientEmail: string) => Promise<IClientShowDTO | undefined>
  create: (client: IClientPostRequestDTO) => Promise<IClientPostResponseDTO>
}
