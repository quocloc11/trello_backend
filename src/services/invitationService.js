import { pickUser, slugify } from '~/utils/formatters'
import { INVITATION_TYPES, BOARD_INVITATION_STATUS } from '../utils/constants'
import { userModel } from '~/models/userModel'
import { boardModel } from '~/models/boardModel'
import { invitationModel } from '~/models/invitationModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
//luu y trong server phai co return
const createdNewBoardInvitation = async (reqBody, inviterId) => {


  // eslint-disable-next-line no-useless-catch
  try {
    const inviter = await userModel.findOneById(inviterId)
    const invitee = await userModel.findOneByEmail(reqBody.inviteeEmail)
    const board = await boardModel.findOneByid(reqBody.boardId)

    if (!invitee || !inviter || !board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Inviter, Invitee or Board')
    }
    const newInvitationData = {
      inviterId,
      inviteeId: invitee._id.toString(),
      type: INVITATION_TYPES.BOARD_INVITATION,
      boardInvitation: {
        boardId: board._id.toString(),
        status: BOARD_INVITATION_STATUS.PENDING
      }
    }
    // console.log('inviterId', inviterId)

    const createdInvitation = await invitationModel.createNewBoardInvitation(newInvitationData)
    // console.log('createdInvitation', createdInvitation)
    const getInvitation = await invitationModel.findOneById(createdInvitation.inviterId.toString())

    const resInvitation = {
      ...getInvitation,
      board,
      inviter: pickUser(inviter),
      invitee: pickUser(invitee),
    }
    return resInvitation
  } catch (error) { throw error }
}
const getInvitations = async (userId) => {
  // eslint-disable-next-line no-useless-catch
  try {

    const getInvitations = await invitationModel.findByUser(userId)


    const resInvitations = getInvitations.map(i => {
      return {
        ...i,
        inviter: i.inviter[0] || {},
        invitee: i.invitee[0] || {},
        board: i.board[0] || {},
      }
    })

    return getInvitations
  } catch (error) { throw error }
}
const updateBoardInvitation = async (userId, invitationId, status) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const getInvitation = await invitationModel.findOneById(invitationId)
    if (!getInvitation) throw new ApiError(StatusCodes.NOT_FOUND, 'Invitation not found')

    const boardId = getInvitation.boardInvitation.boardId
    const getBoard = await boardModel.findOneByid(boardId)
    if (!getBoard) throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')

    const boardOwnerAndMemberIds = [...getBoard.ownerIds, ...getBoard.memberIds].toString()
    if (status === BOARD_INVITATION_STATUS.ACCEPTED && boardOwnerAndMemberIds.includes(userId)) {
      throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your are already a member pf this board')
    }

    const updateData = {
      boardInvitation: {
        ...getInvitation.boardInvitation,
        status: status
      }
    }

    const updatedInvitation = await invitationModel.update(invitationId, updateData)
    console.log('updatedInvitation', updatedInvitation)
    if (updatedInvitation.boardInvitation.status === BOARD_INVITATION_STATUS.ACCEPTED) {
      await boardModel.pushMembersIds(boardId, userId)
    }
    return updatedInvitation
  } catch (error) { throw error }
}
export const invitationService = {
  createdNewBoardInvitation,
  getInvitations, updateBoardInvitation
}