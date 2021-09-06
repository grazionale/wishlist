const rootPath = process.env.NODE_ENV === 'dev' ? 'src' : 'dist'

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '5432',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'wishlist',
  extra: {
    ssl: process.env.NODE_ENV === 'dev'
      ? false
      : { rejectUnauthorized: false }
  },
  synchronize: false,
  logging: false,
  entities: [
    `${rootPath}/app/entities/**/*{.ts,.js}`
  ],
  migrations: [
    `${rootPath}/database/migrations/**/*{.ts,.js}`
  ],
  subscribers: [
    `${rootPath}/subscriber/**/*{.ts,.js}`
  ],
  cli: {
    entitiesDir: `${rootPath}/app/entities`,
    migrationsDir: `${rootPath}/database/migrations`,
    subscribersDir: `${rootPath}/subscriber`
  }
}
