
import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'
const createNew = async (req, res, next) => {
  try {
    const createdCard = await userService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) {
    next(error)
    // console.log(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}

const verifyAccount = async (req, res, next) => {
  try {
    const result = await userService.verifyAccount(req.body)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)

  }
}
const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body)
    console.log('result', result)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)

  }
}
export const userController = {
  createNew, verifyAccount, login
}
