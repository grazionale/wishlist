import FakeClientRepository from '../mocks/repositories/fakes/fake-client-repository'
import ClientService from '../../src/app/services/client-service'

describe('ClientService', () => {
  let fakeClientRepository: FakeClientRepository
  let clientService: ClientService

  beforeEach(() => {
    fakeClientRepository = new FakeClientRepository()
    clientService = new ClientService(fakeClientRepository)
  })

  it('should be list of clients', async () => {
    const listOfClients = await clientService.index()

    expect(listOfClients).toHaveLength(1)
  })

  it('should be return one client', async () => {
    const client = await clientService.show('1')

    expect(client).toHaveProperty('id')
    expect(client.id).toBe(1)
  })
})
