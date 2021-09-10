import 'reflect-metadata'
import env from './config/env'
import SetupDatabase from './config/setup-database'
import RabbitmqServer from './config/setup-rabbitmq'
import setupProductExternalQueue from '../data/queues/product-external-queue'

const setupDatabase = new SetupDatabase()
const rabbitMqServer = new RabbitmqServer(env.amqp_rabbitmq)

setupDatabase.handle().then(async () => {
  const app = (await import('./config/app')).default

  setupProductExternalQueue(rabbitMqServer)

  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}/api`))
}).catch(error => console.log(error))
