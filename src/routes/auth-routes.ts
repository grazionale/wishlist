import { Router } from 'express'
import AuthController from '../app/controllers/auth-controller'

const authController = new AuthController()

export default (router: Router): void => {
  router.post('/auth', authController.post)
}
