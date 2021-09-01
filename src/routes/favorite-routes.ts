import { Router } from 'express'
import FavoritesController from '../app/controllers/favorite-controller'

const favoritesController = new FavoritesController()

export default (router: Router): void => {
  router.get('/favorites', favoritesController.index)
  router.get('/favorites/:favorite_id', favoritesController.show)
  router.post('/favorites', favoritesController.post)
  router.delete('/favorites/:favorite_id', favoritesController.delete)
}
