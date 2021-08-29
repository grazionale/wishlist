import 'reflect-metadata'
import env from './config/env'
import app from './config/app'
import { createConnection } from 'typeorm'

createConnection().then(async () => {
  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}/api`))
}).catch(error => console.log(error))
