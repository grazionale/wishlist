import ClientsController from '../../controllers/ClientController'
import { makeClientService } from '../makeClientService'

export const makeClientController = (): ClientsController => {
  return new ClientsController(makeClientService())
}
