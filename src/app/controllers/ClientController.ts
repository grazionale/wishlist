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
}
