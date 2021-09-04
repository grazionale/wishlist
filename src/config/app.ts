
import express from 'express'
import 'express-async-errors'
import setupRoutes from './setup-routes'
import setupMiddlewares from './setup-middlewares'
import setupHandleError from './setup-handle-error'
import setupProductExternalQueue from '../app/queues/product-external-queue'
import RabbitmqServer from './setup-rabbitmq'
import env from './env'

const app = express()
const rabbitMqServer = new RabbitmqServer(env.amqp_rabbitmq)

setupMiddlewares(app)
setupRoutes(app)
setupHandleError(app)
setupProductExternalQueue(rabbitMqServer)

export default app
