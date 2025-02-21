
import express from 'express'
import { mapOrder } from '~/utils/sorts.js'
import { CONNECT_DB, GET_DB } from './config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import cors from 'cors'
import { corsOptions } from './config/cors'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware.js'
import cookieParser from 'cookie-parser'

const START_SERVER = () => {

  const app = express()

  app.use((req, res, next) => {
    res.set(('Cache-Control', 'no-store'))
    next()
  })
  app.use(cookieParser())

  app.use(cors(corsOptions))
  app.use(express.json())

  app.use('/v1', APIs_V1)

  app.use(errorHandlingMiddleware)


  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
  })
}
(async () => {
  try {
    console.log('1.Connect to mongoDB Cloud')
    await CONNECT_DB()
    console.log('2.Connect to mongoDB Cloud')
    START_SERVER()

  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Connect to mongoDB Cloud'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)

//   })
