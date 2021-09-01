import { Client } from '../../../src/app/entities/client'
import IClientIndexResponseDTO from '../../../src/app/dtos/repositories/client-repository-index-response-dto'
import IClientPostRequestDTO from '../../../src/app/dtos/repositories/client-repository-post-request-dto'
import IClientPostResponseDTO from '../../../src/app/dtos/repositories/client-repository-post-response-dto'
import IClientShowResponseDTO from '../../../src/app/dtos/repositories/client-repository-show-response-dto'
import { IClientRepository } from '../../../src/app/interfaces/repositories/client-repository'
import IClientPutRequestDTO from '../../../src/app/dtos/repositories/client-repository-put-request-dto'
import IClientPutResponseDTO from '../../../src/app/dtos/repositories/client-repository-put-response-dto'

class FakeClientRepository implements IClientRepository {
  private clients: Client[] = []

  public async index (): Promise<IClientIndexResponseDTO[]> {
    return this.clients
  }

  public async show (clientId: string): Promise<IClientShowResponseDTO | undefined> {
    return this.clients.find(client => client.id.toString() === clientId)
  }

  public async create (clientData: IClientPostRequestDTO): Promise<IClientPostResponseDTO> {
    const client = new Client()
    Object.assign(client, { id: 1, ...clientData })
    this.clients.push(client)
    return client
  }

  public async findByEmail (clientEmail: string): Promise<IClientShowResponseDTO | undefined> {
    const findClient = this.clients.find(client => client.email === clientEmail)
    return findClient
  }

  public async update (clientData: IClientPutRequestDTO): Promise<IClientPutResponseDTO> {
    const findClient = this.clients.find(client => client.id === clientData.id)
    if (findClient) {
      Object.assign(findClient, { ...clientData })
      this.clients.push(findClient)
      return findClient
    }
    this.clients.push({ favorites: [], ...clientData })
    return clientData
  }

  public async delete (clientId: number): Promise<string> {
    this.clients = this.clients.filter(client => client.id !== clientId)
    return 'Client successfully deleted'
  }
}

export default FakeClientRepository
