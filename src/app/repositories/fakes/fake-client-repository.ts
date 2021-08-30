import IClientIndexDTO from '../dtos/client-repository-index-dto'

class FakeClientRepository {
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
