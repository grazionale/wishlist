import ClientRepository from '../repositories/client-repository'
import FakeClientRepository from '../repositories/fakes/fake-client-repository'
import IClientIndexDTO from './dtos/client-service-index-dto'

class ClientService {
  private readonly clientRepository: ClientRepository | FakeClientRepository

  constructor (clientRepository?: ClientRepository | FakeClientRepository) { // TODO - Trocar por uma interface
    this.clientRepository = clientRepository || new ClientRepository()
  }

  public async index (): Promise<IClientIndexDTO[]> {
    const listOfClients = this.clientRepository.index()

    return await listOfClients
  }
}

export default ClientService
