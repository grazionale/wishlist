import { Request, Response } from 'express'
import AppError from '../../app/errors/app-error'
import { makeFavoriteService } from '../../main/factories/services/favorite-service-factory'

export default class FavoriteController {
  public async index (request: Request, response: Response): Promise<Response> {
    const { client_id } = request.query

    if (!client_id) {
      throw new AppError('client_id is required', 400)
    }

    const favoriteService = makeFavoriteService()

    const listOfFavorite = await favoriteService.index(Number(client_id))
    return response.json(listOfFavorite)
  }

  public async show (request: Request, response: Response): Promise<Response> {
    const { favorite_id } = request.params
    const favoriteService = makeFavoriteService()

    const favorite = await favoriteService.show(favorite_id)
    return response.json(favorite)
  }

  public async post (request: Request, response: Response): Promise<Response> {
    const { clientId, externalProductId } = request.body
    const favoriteService = makeFavoriteService()

    const favorite = await favoriteService.create({ clientId, externalProductId })

    return response.json(favorite)
  }

  public async delete (request: Request, response: Response): Promise<Response> {
    const { favorite_id } = request.params

    const favoriteService = makeFavoriteService()

    const result = await favoriteService.delete(Number(favorite_id))

    return response.json(result)
  }
}
