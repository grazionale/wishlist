import { Router } from 'express'
import ClientsController from '../app/controllers/client-controller'

const clientsController = new ClientsController()

export default (router: Router): void => {
  router.get('/clients', clientsController.index)
  router.get('/clients/:client_id', clientsController.show)
  router.post('/clients', clientsController.post)
}
