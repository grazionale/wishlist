import { Router } from 'express'
import ClientsController from '../../app/controllers/client-controller'
import { ensureAuthenticated } from '../../app/middlewares'

const clientsController = new ClientsController()

export default (router: Router): void => {
  router.get('/clients', ensureAuthenticated, clientsController.index)
  router.get('/clients/:client_id', ensureAuthenticated, clientsController.show)
  router.post('/clients', ensureAuthenticated, clientsController.post)
  router.put('/clients/:client_id', ensureAuthenticated, clientsController.put)
  router.delete('/clients/:client_id', ensureAuthenticated, clientsController.delete)
}
