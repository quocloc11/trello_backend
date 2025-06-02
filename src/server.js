
import express from 'express'
import { mapOrder } from '~/utils/sorts.js'
import { CONNECT_DB, GET_DB } from './config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import cors from 'cors'
import { corsOptions } from './config/cors'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware.js'
import cookieParser from 'cookie-parser'

import http from 'http'
import socketIo from 'socket.io'
import { emit } from 'process'
import { inviteUserToBoardSocket } from './sockets/inviteUserToBoardSocket'
const START_SERVER = () => {

  const app = express()

  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next()
  })
  app.use(cookieParser())

  app.use(cors(corsOptions))
  app.use(express.json())

  app.use('/v1', APIs_V1)

  app.use(errorHandlingMiddleware)

  const server = http.createServer(app);

  const io = socketIo(server, { cors: corsOptions });
  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    inviteUserToBoardSocket(socket);
  });

  if (env.BUILD_MODE === 'production') {
    const port = process.env.PORT || env.APP_PORT || 3000;
    const host = '0.0.0.0'; // thường production bind ra tất cả IP

    server.listen(port, host, () => {
      console.log(`Hello ${env.AUTHOR}, I am running at http://${port}/`);
    });
  } else {
    const port = env.APP_PORT || 3000;
    const host = env.APP_HOST || 'localhost';

    server.listen(port, host, () => {
      console.log(`Hello ${env.AUTHOR}, I am running at http://${host}:${port}/`);
    });
  }


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
