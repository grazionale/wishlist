import { Router } from 'express'
import UserController from '../app/controllers/user-controller'

const userController = new UserController()

export default (router: Router): void => {
  router.post('/users', userController.post)
}
