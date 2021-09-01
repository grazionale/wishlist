import { Request, Response } from 'express'
import { makeClientService } from '../factories/services/client-service-factory'

export default class ClientsController {
  public async index (request: Request, response: Response): Promise<Response> {
    const clientService = makeClientService()

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
    const clientService = makeClientService()

    const client = await clientService.show(client_id)
    return response.json(client)
  }

  public async post (request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body
    const clientService = makeClientService()

    const client = await clientService.create({ name, email })

    return response.json(client)
  }

  public async put (request: Request, response: Response): Promise<Response> {
    const { client_id } = request.params
    const { name, email } = request.body

    const clientService = makeClientService()

    const client = await clientService.update({ id: Number(client_id), name, email })

    return response.json(client)
  }
}
