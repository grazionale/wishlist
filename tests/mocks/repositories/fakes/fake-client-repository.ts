import IClientIndexDTO from '../../../../src/app/repositories/dtos/client-repository-index-dto'
import { IClientRepository } from '../../../../src/app/repositories/interfaces/client-repository'

class FakeClientRepository implements IClientRepository {
  public async index (): Promise<IClientIndexDTO[]> {
    const listOfClients = [
      {
        id: 1,
        name: 'Gabriel',
        email: 'gabriel@hotmail.com'
      }
    ]

    return listOfClients
  }
}

export default FakeClientRepository
