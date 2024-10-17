import { slugify } from '~/utils/formatters'
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
//luu y trong server phai co return
const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newColumn = {
      ...reqBody
    }
    const createdColumn = await columnModel.createNew(newColumn)

    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)
    if (getNewColumn) {
      getNewColumn.cards = []
      await boardModel.pushColumnOrderIds(getNewColumn)
    }
    return getNewColumn
  } catch (error) { throw error }
}

export const columnService = {
  createNew,
}