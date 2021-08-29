
import express from 'express'
import setupRoutes from './setup-routes'

const app = express()

setupRoutes(app)

export default app
