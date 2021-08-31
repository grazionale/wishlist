import { getRepository, Repository } from 'typeorm'
import { Client } from '../entities/Client'
import IClientIndexDTO from './dtos/client-repository-index-dto'
import IClientPostRequestDTO from './dtos/client-repository-post-request-dto'
import IClientPostResponseDTO from './dtos/client-repository-post-response-dto'
import IClientShowDTO from './dtos/client-repository-show-dto'
import { IClientRepository } from './interfaces/client-repository'

class ClientRepository implements IClientRepository {
  private readonly ormRepository: Repository<Client>

  constructor () {
    this.ormRepository = getRepository(Client)
  }

  public async index (): Promise<IClientIndexDTO[]> {
    const listOfClients = await this.ormRepository.find()

    return listOfClients
  }

  public async show (clientId: string): Promise<IClientShowDTO | undefined> {
    const client = await this.ormRepository.findOne(clientId)

    return client
  }

  public async create (client: IClientPostRequestDTO): Promise<IClientPostResponseDTO> {
    const clientSaved = await this.ormRepository.save(client)

    return clientSaved
  }
}

export default ClientRepository
