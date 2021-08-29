module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '5432',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'wishlist',
  synchronize: false,
  logging: false,
  entities: [
    'src/app/entities/**/*.ts'
  ],
  migrations: [
    'src/database/migrations/**/*.ts'
  ],
  subscribers: [
    'src/subscriber/**/*.ts'
  ],
  cli: {
    entitiesDir: 'src/app/entities',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/subscriber'
  }
}
