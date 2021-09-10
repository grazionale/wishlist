const rootPath = process.env.NODE_ENV === 'dev' ? 'src' : 'dist'
console.log(rootPath)
module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '5432',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'wishlist',
  extra: {
    ssl: process.env.DB_EXTRA_SSL_CONFIG === 'true'
      ? { rejectUnauthorized: false }
      : false
  },
  synchronize: false,
  logging: false,
  entities: [
    `${rootPath}/app/entities/**/*{.ts,.js}`,
    `${rootPath}/domain/entities/**/*{.ts,.js}`
  ],
  migrations: [
    `${rootPath}/database/migrations/**/*{.ts,.js}`
  ],
  subscribers: [
    `${rootPath}/subscriber/**/*{.ts,.js}`
  ],
  cli: {
    entitiesDir: 'src/app/entities',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/subscriber'
  }
}
