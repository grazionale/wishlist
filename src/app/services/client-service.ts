import { IClientRepository } from '../repositories/interfaces/client-repository'
import IClientIndexDTO from './dtos/client-service-index-dto'

class ClientService {
  private readonly clientRepository: IClientRepository

  constructor (clientRepository: IClientRepository) {
    this.clientRepository = clientRepository
  }

  public async index (): Promise<IClientIndexDTO[]> {
    const listOfClients = this.clientRepository.index()

    return await listOfClients
  }
}

export default ClientService
