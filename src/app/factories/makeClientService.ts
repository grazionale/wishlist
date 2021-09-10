import ClientService from '../services/client-service'
import ClientRepository from '../repositories/client-repository'

export const makeClientService = (): ClientService => {
  const clientRepository = new ClientRepository()
  return new ClientService(clientRepository)
}
