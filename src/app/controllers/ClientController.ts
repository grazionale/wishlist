import { Request, Response } from 'express'
import ClientService from '../services/client-service'

export default class ClientsController {
  public async index (request: Request, response: Response): Promise<Response> {
    const clientService = new ClientService()

    try {
      const listOfClients = await clientService.index()
      return response.json(listOfClients)
    } catch (err) {
      console.error(err)
      return response.json({ error: err })
    }
  }
}