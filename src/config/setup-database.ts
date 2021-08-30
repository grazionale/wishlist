import { Connection, createConnection } from 'typeorm'

export default class SetupDatabase {
  public async handle (): Promise<Connection | null> {
    try {
      const conn = await createConnection()
      console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`)
    } catch (err) {
      console.log(err)
    }
    return null
  }
}
