import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
//luu y trong server phai co return
const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createdBoard = await boardModel.createNew(newBoard)
    console.log(createdBoard)
    const getNewBoard = await boardModel.findOneByid(createdBoard.insertedId)
    console.log('getNewBoard', getNewBoard)
    return getNewBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}