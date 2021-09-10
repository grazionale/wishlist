import { Router } from 'express'
import FavoritesController from '../../app/controllers/favorite-controller'
import { ensureAuthenticated } from '../../app/middlewares'

const favoritesController = new FavoritesController()

export default (router: Router): void => {
  router.get('/favorites', ensureAuthenticated, favoritesController.index)
  router.get('/favorites/:favorite_id', ensureAuthenticated, favoritesController.show)
  router.post('/favorites', ensureAuthenticated, favoritesController.post)
  router.delete('/favorites/:favorite_id', ensureAuthenticated, favoritesController.delete)
}
