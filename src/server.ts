import 'reflect-metadata'
import 'express-async-errors'
import env from './config/env'
import SetupDatabase from './config/setup-database'

const setupDatabase = new SetupDatabase()

setupDatabase.handle().then(async () => {
  const app = (await import('./config/app')).default
  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}/api`))
}).catch(error => console.log(error))
