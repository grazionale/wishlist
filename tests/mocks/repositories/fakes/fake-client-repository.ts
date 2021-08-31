import { Client } from '../../../../src/app/entities/Client'
import IClientIndexDTO from '../../../../src/app/repositories/dtos/client-repository-index-dto'
import IClientPostRequestDTO from '../../../../src/app/repositories/dtos/client-repository-post-request-dto'
import IClientPostResponseDTO from '../../../../src/app/repositories/dtos/client-repository-post-response-dto'
import IClientShowDTO from '../../../../src/app/repositories/dtos/client-repository-show-dto'
import { IClientRepository } from '../../../../src/app/repositories/interfaces/client-repository'

class FakeClientRepository implements IClientRepository {
  private readonly clients: Client[] = []

  public async index (): Promise<IClientIndexDTO[]> {
    return this.clients
  }

  public async show (clientId: string): Promise<IClientShowDTO | undefined> {
    return this.clients.find(client => client.id.toString() === clientId)
  }

  public async create (clientData: IClientPostRequestDTO): Promise<IClientPostResponseDTO> {
    const client = new Client()
    Object.assign(client, { id: 1, ...clientData })
    this.clients.push(client)
    return client
  }

  public async findByEmail (clientEmail: string): Promise<IClientShowDTO | undefined> {
    const findClient = this.clients.find(client => client.email === clientEmail)
    return findClient
  }
}

export default FakeClientRepository
