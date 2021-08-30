import IClientIndexDTO from '../dtos/client-repository-index-dto'

export interface IClientRepository {
  index: () => Promise<IClientIndexDTO[]>
}
