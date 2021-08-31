import AppError from '../errors/app-error'
import { IClientRepository } from '../repositories/interfaces/client-repository'
import IClientIndexDTO from './dtos/client-service-index-dto'
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
}

export default ClientService
