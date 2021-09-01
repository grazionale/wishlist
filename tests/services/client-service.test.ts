import FakeClientRepository from '../mocks/repositories/fake-client-repository'
import ClientService from '../../src/app/services/client-service'
import AppError from '../../src/app/errors/app-error'
import { Client } from '../../src/app/entities/client'

const makeClient = (nome?: string, email?: string): Client => {
  const client = new Client()
  client.email = email || 'client@email.com'
  client.name = nome || 'client'

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

  it('should be return 400 when try insert already exist client', async () => {
    await clientService.create(makeClient())

    await expect(clientService.create(makeClient()))
      .rejects.toEqual(new AppError('Client already exists'))
  })

  it('should be update one client', async () => {
    const clientCreated = await clientService.create(makeClient())

    const mockClient = makeClient('nome_atualizado', 'atualizado@email.com')
    const client = await clientService.update({ ...mockClient, id: clientCreated.id })

    expect(client).toEqual({ ...mockClient, id: clientCreated.id })
  })

  it('should be return 404 when try update a client inexistent', async () => {
    const mockClient = makeClient()

    await expect(clientService.update({ ...mockClient, id: 100 }))
      .rejects.toEqual(new AppError('Client not exists', 404))
  })
})
