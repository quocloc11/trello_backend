import express from 'express'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { invitationValidation } from '~/validations/invitationValidation'
import { invitationController } from '~/controllers/invitationController'
const Router = express.Router()

Router.route('/board')
  .post(authMiddleware.isAuthorized,
    invitationValidation.createdNewBoardInvitation,
    invitationController.createdNewBoardInvitation
  )
Router.route('/')
  .get(authMiddleware.isAuthorized, invitationController.getInvitations)

Router.route('/board/:invitationId')
  .put(authMiddleware.isAuthorized, invitationController.updateBoardInvitation)

export const invitationRoute = Router
