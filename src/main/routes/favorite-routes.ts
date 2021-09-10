import { Router } from 'express'
import { ensureAuthenticated } from '../../app/middlewares'
import FavoritesController from '../../presentation/controllers/favorite-controller'

const favoritesController = new FavoritesController()

export default (router: Router): void => {
  router.get('/favorites', ensureAuthenticated, favoritesController.index)
  router.get('/favorites/:favorite_id', ensureAuthenticated, favoritesController.show)
  router.post('/favorites', ensureAuthenticated, favoritesController.post)
  router.delete('/favorites/:favorite_id', ensureAuthenticated, favoritesController.delete)
}
