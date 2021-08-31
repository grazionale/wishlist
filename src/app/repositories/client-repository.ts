import { getRepository, Repository } from 'typeorm'
import { Client } from '../entities/Client'
import IClientIndexDTO from './dtos/client-repository-index-dto'
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
}

export default ClientRepository
