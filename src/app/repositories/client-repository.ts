import { getRepository, Repository } from 'typeorm'
import { Client } from '../entities/Client'
import IClientIndexDTO from './dtos/client-repository-index-dto'
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
}

export default ClientRepository
