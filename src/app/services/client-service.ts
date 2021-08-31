import AppError from '../errors/app-error'
import IClientPostResponseDTO from '../dtos/repositories/client-repository-post-response-dto'
import { IClientRepository } from '../interfaces/repositories/client-repository'
import IClientIndexResponseDTO from '../dtos/services/client-service-index-response-dto'
import IClientPostRequestDTO from '../dtos/services/client-service-post-request-dto'
import IClientShowResponseDTO from '../dtos/services/client-service-show-response-dto'

class ClientService {
  private readonly clientRepository: IClientRepository

  constructor (clientRepository: IClientRepository) {
    this.clientRepository = clientRepository
  }

  public async index (): Promise<IClientIndexResponseDTO[]> {
    const listOfClients = this.clientRepository.index()

    return await listOfClients
  }

  public async show (clientId: string): Promise<IClientShowResponseDTO> {
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
