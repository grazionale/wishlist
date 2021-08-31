import AppError from '../errors/app-error'
import IClientPostResponseDTO from '../repositories/dtos/client-repository-post-response-dto'
import { IClientRepository } from '../repositories/interfaces/client-repository'
import IClientIndexDTO from './dtos/client-service-index-dto'
import IClientPostRequestDTO from './dtos/client-service-post-request-dto'
import IClientShowDTO from './dtos/client-service-show-dto'

class ClientService {
  private readonly clientRepository: IClientRepository

  constructor (clientRepository: IClientRepository) {
    this.clientRepository = clientRepository
  }

  public async index (): Promise<IClientIndexDTO[]> {
    const listOfClients = this.clientRepository.index()

    return await listOfClients
  }

  public async show (clientId: string): Promise<IClientShowDTO> {
    const client = await this.clientRepository.show(clientId)

    if (!client) {
      throw new AppError('client not found', 404)
    }

    return client
  }

  public async create (client: IClientPostRequestDTO): Promise<IClientPostResponseDTO> {
    const alreadyExists = await this.clientRepository.findByEmail(client.email)

    if (alreadyExists) {
      throw new AppError('Client already exists', 400)
    }
    const clientSaved = await this.clientRepository.create(client)

    return clientSaved
  }
}

export default ClientService
