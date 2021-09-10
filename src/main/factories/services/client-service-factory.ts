import ClientService from '../../../data/services/client-service'
import ClientRepository from '../../../infra/typeorm/client-repository'

export const makeClientService = (): ClientService => {
  const clientRepository = new ClientRepository()
  return new ClientService(clientRepository)
}
