import IClientShowDTO from '../../services/dtos/client-service-show-dto'
import IClientIndexDTO from '../dtos/client-repository-index-dto'

export interface IClientRepository {
  index: () => Promise<IClientIndexDTO[]>
  show: (clientId: string) => Promise<IClientShowDTO | undefined>
}
