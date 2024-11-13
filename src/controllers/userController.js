
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

export const userController = {
  createNew
}
