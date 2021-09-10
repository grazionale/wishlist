import { Connection, ConnectionOptions, createConnection } from 'typeorm'
export default class SetupDatabase {
  private readonly customOrmConfig?: ConnectionOptions

  constructor (
    customOrmConfig?: ConnectionOptions
  ) {
    this.customOrmConfig = customOrmConfig
  }

  public async handle (): Promise<Connection | null> {
    let conn: Connection
    try {
      if (this.customOrmConfig) {
        conn = await createConnection(this.customOrmConfig)
      } else {
        // Por padrão, TypeORM busca o arquivo ormconfig.ts na raiz do projeto
        conn = await createConnection()
      }
      console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`)
    } catch (err) {
      console.log(err)
    }
    return null
  }
}
