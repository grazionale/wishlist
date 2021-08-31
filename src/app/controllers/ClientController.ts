import { Request, Response } from 'express'
import ClientRepository from '../repositories/client-repository'
import ClientService from '../services/client-service'

export default class ClientsController {
  public async index (request: Request, response: Response): Promise<Response> {
    const clientService = new ClientService(new ClientRepository())

    try {
      const listOfClients = await clientService.index()
      return response.json(listOfClients)
    } catch (err) {
      console.error(err)
      return response.json({ error: err })
    }
  }

  public async show (request: Request, response: Response): Promise<Response> {
    const { client_id } = request.params
    const clientService = new ClientService(new ClientRepository())

    const client = await clientService.show(client_id)
    return response.json(client)
  }

  public async post (request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body
    const clientService = new ClientService(new ClientRepository())

    const client = await clientService.create({ name, email })

    return response.json(client)
  }
}
