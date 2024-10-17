
import express from 'express'
import { columnValidation } from '~/validations/columnValidation'
import { columnController } from '~/controllers/columnValidation'
const Router = express.Router()

Router.route('/')

  .post(columnValidation.createNew, columnController.createNew)

//.push()
export const columnRoute = Router