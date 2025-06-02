
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { boardService } from '~/services/boardService'
const createNew = async (req, res, next) => {
  try {

    const userId = req.jwtDecoded._id

    const createdBoard = await boardService.createNew(userId, req.body)
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
    const userId = req.jwtDecoded._id
    const boardId = req.params.id
    const Board = await boardService.getDetails(userId, boardId)
    res.status(StatusCodes.OK).json(Board)

  } catch (error) {
    next(error)
    // console.log(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}
const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const updateBoard = await boardService.update(boardId, req.body)
    res.status(StatusCodes.OK).json(updateBoard)

  } catch (error) {
    next(error)
    // console.log(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}
const moveCardToDifferentColumn = async (req, res, next) => {
  try {
    const result = await boardService.moveCardToDifferentColumn(req.body)
    res.status(StatusCodes.OK).json(result)

  } catch (error) {
    next(error)
    // console.log(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}

const getBoards = async (req, res, next) => {
  try {
    const userId = req.jwtDecoded._id
    const { page, itemsPerPage, q } = req.query
    const queryFilters = q
    const results = await boardService.getBoards(userId, page, itemsPerPage, queryFilters)

    res.status(StatusCodes.OK).json(results)

  } catch (error) {
    next(error)
    // console.log(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}
export const boardController = {
  createNew, getDetails, update, moveCardToDifferentColumn, getBoards
}
