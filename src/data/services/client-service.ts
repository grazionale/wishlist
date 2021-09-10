import AppError from '../../app/errors/app-error'
import { IClientRepository } from '../../infra/repositories/client-repository'
import { IClientService } from '../../domain/services/client-service'

class ClientService implements IClientService {
  private readonly clientRepository: IClientRepository

  constructor (clientRepository: IClientRepository) {
    this.clientRepository = clientRepository
  }

  public async index (): Promise<IClientService.IndexResult[]> {
    const listOfClients = this.clientRepository.index()

    return await listOfClients
  }

  public async show (clientId: string): Promise<IClientService.ShowResult> {
    const client = await this.clientRepository.show(clientId)

    if (!client) {
      throw new AppError('client not found', 404)
    }

    return client
  }

  public async create (client: IClientService.CreateParams): Promise<IClientService.CreateResult> {
    const alreadyExists = await this.clientRepository.findByEmail(client.email)

    if (alreadyExists) {
      throw new AppError('Client already exists', 400)
    }
    const clientSaved = await this.clientRepository.create(client)

    return clientSaved
  }

  public async update (client: IClientService.UpdateParams): Promise<IClientService.UpdateResult> {
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
