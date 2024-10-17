
import express from 'express'
import { cardValidation } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardValidation'
const Router = express.Router()

Router.route('/')
  .post(cardValidation.createNew, cardController.createNew)

//.push()
export const cardRoute = Router