import { getRepository, Repository } from 'typeorm'
import { Client } from '../../domain/entities/client'
import { IClientRepository } from '../repositories/client-repository'

class ClientRepository implements IClientRepository {
  private readonly ormRepository: Repository<Client>

  constructor () {
    this.ormRepository = getRepository(Client)
  }

  public async index (): Promise<IClientRepository.IndexResult[]> {
    const listOfClients = await this.ormRepository.find()

    return listOfClients
  }

  public async show (clientId: string): Promise<IClientRepository.ShowResult | undefined> {
    const client = await this.ormRepository.findOne(clientId)

    return client
  }

  public async create (client: IClientRepository.CreateParams): Promise<IClientRepository.CreateResult> {
    const clientSaved = await this.ormRepository.save(client)

    return clientSaved
  }

  public async findByEmail (clientEmail: string): Promise<IClientRepository.FindByEmailResult | undefined> {
    const client = await this.ormRepository.findOne({ email: clientEmail })

    return client
  }

  public async update (client: IClientRepository.UpdateParams): Promise<IClientRepository.UpdateResult> {
    const clientSaved = await this.ormRepository.save(client)

    return clientSaved
  }

  public async delete (clientId: number): Promise<string> {
    await this.ormRepository.delete(clientId)
    return 'Client successfully deleted'
  }
}

export default ClientRepository
