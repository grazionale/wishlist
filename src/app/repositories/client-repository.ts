import { getRepository, Repository } from 'typeorm'
import { Client } from '../entities/client'
import IClientIndexResponseDTO from '../dtos/repositories/client-repository-index-response-dto'
import IClientPostRequestDTO from '../dtos/repositories/client-repository-post-request-dto'
import IClientPostResponseDTO from '../dtos/repositories/client-repository-post-response-dto'
import IClientShowResponseDTO from '../dtos/repositories/client-repository-show-response-dto'
import { IClientRepository } from '../interfaces/repositories/client-repository'

class ClientRepository implements IClientRepository {
  private readonly ormRepository: Repository<Client>

  constructor () {
    this.ormRepository = getRepository(Client)
  }

  public async index (): Promise<IClientIndexResponseDTO[]> {
    const listOfClients = await this.ormRepository.find()

    return listOfClients
  }

  public async show (clientId: string): Promise<IClientShowResponseDTO | undefined> {
    const client = await this.ormRepository.findOne(clientId)

    return client
  }

  public async create (client: IClientPostRequestDTO): Promise<IClientPostResponseDTO> {
    const clientSaved = await this.ormRepository.save(client)

    return clientSaved
  }

  public async findByEmail (clientEmail: string): Promise<IClientShowResponseDTO | undefined> {
    const client = await this.ormRepository.findOne({ email: clientEmail })

    return client
  }
}

export default ClientRepository
