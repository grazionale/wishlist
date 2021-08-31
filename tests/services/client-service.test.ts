import FakeClientRepository from '../mocks/repositories/fakes/fake-client-repository'
import ClientService from '../../src/app/services/client-service'
import { Client } from '../../src/app/entities/Client'

const makeClient = (email?: string): Client => {
  const client = new Client()
  client.email = email || 'client@email.com'
  client.name = 'client'

  return client
}

describe('ClientService', () => {
  let fakeClientRepository: FakeClientRepository
  let clientService: ClientService

  beforeEach(() => {
    fakeClientRepository = new FakeClientRepository()
    clientService = new ClientService(fakeClientRepository)
  })

  it('should be list of clients', async () => {
    await clientService.create(makeClient())

    const listOfClients = await clientService.index()

    expect(listOfClients).toHaveLength(1)
  })

  it('should be return one client', async () => {
    await clientService.create(makeClient())

    const client = await clientService.show('1')

    expect(client).toHaveProperty('id')
    expect(client.id).toBe(1)
  })

  it('should be insert one client', async () => {
    const mockClient = makeClient()
    const client = await clientService.create(mockClient)

    expect(client).toHaveProperty('id')
    expect(client.name).toBe(mockClient.name)
    expect(client.email).toBe(mockClient.email)
  })
})
