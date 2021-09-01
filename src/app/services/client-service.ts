import AppError from '../errors/app-error'
import IClientPostResponseDTO from '../dtos/services/client/client-service-post-response-dto'
import { IClientRepository } from '../interfaces/repositories/client/client-repository'
import IClientIndexResponseDTO from '../dtos/services/client/client-service-index-response-dto'
import IClientPostRequestDTO from '../dtos/services/client/client-service-post-request-dto'
import IClientShowResponseDTO from '../dtos/services/client/client-service-show-response-dto'
import IClientPutRequestDTO from '../dtos/services/client/client-service-put-request-dto'
import IClientPutResponseDTO from '../dtos/services/client/client-service-put-response-dto'
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

  public async update (client: IClientPutRequestDTO): Promise<IClientPutResponseDTO> {
    const findClient = await this.clientRepository.show(client.id.toString())

    if (!findClient) {
      throw new AppError('Client not exists', 404)
    }

    const clientSaved = await this.clientRepository.update(client)

    return clientSaved
  }

  public async delete (clientId: number): Promise<string> {
    const findClient = await this.clientRepository.show(clientId.toString())

    if (!findClient) {
      throw new AppError('Client not exists', 404)
    }

    await this.clientRepository.delete(clientId)

    return 'Client successfully deleted'
  }
}

export default ClientService
