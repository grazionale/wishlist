import { ConnectionOptions } from 'typeorm'

const config: ConnectionOptions = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [
    'src/app/entities/**/*.ts'
  ],
  synchronize: true,
  logging: false
}

export = config
