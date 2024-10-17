
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { boardService } from '~/services/boardService'
const createNew = async (req, res, next) => {
  try {
    const createdBoard = await boardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdBoard)

  } catch (error) {
    next(error)
    // console.log(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}
const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const Board = await boardService.getDetails(boardId)
    res.status(StatusCodes.OK).json(Board)

  } catch (error) {
    next(error)
    // console.log(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}

export const boardController = {
  createNew, getDetails
}
