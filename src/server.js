import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import './config'
import routes from './routes'

function setupMiddleware (app) {
  app.use(bodyParser.json())
  app.use(cors())
}

function setupExpress () {
  const app = express()

  setupMiddleware(app)
  routes(app)

  const PORT = process.env.PORT

  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  })
}

setupExpress()
