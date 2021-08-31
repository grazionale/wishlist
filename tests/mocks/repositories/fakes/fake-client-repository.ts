import IClientIndexDTO from '../../../../src/app/repositories/dtos/client-repository-index-dto'
import IClientPostRequestDTO from '../../../../src/app/repositories/dtos/client-repository-post-request-dto'
import IClientPostResponseDTO from '../../../../src/app/repositories/dtos/client-repository-post-response-dto'
import IClientShowDTO from '../../../../src/app/repositories/dtos/client-repository-show-dto'
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

  public async show (): Promise<IClientShowDTO> {
    const client =
    {
      id: 1,
      name: 'Gabriel',
      email: 'gabriel@hotmail.com'
    }

    return client
  }

  public async create (client: IClientPostRequestDTO): Promise<IClientPostResponseDTO> {
    const clientSaved =
    {
      id: 1,
      name: client.name,
      email: client.email
    }

    return clientSaved
  }
}

export default FakeClientRepository
