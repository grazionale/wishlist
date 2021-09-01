import { Request, Response } from 'express'
import { makeClientService } from '../factories/services/client-service-factory'

export default class ClientsController {
  public async index (request: Request, response: Response): Promise<Response> {
    const clientService = makeClientService()

    const listOfClients = await clientService.index() // TODO: remover try catch
    return response.json(listOfClients)
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

  public async delete (request: Request, response: Response): Promise<Response> {
    const { client_id } = request.params

    const clientService = makeClientService()

    const result = await clientService.delete(Number(client_id))

    return response.json(result)
  }
}
