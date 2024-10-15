
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoute'


const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIS v1 ARE READY TO USE' })
})
Router.use('/boards', boardRoute)
export const APIs_V1 = Router
