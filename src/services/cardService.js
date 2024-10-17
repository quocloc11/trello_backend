import { slugify } from '~/utils/formatters'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
//luu y trong server phai co return
const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newCard = {
      ...reqBody
    }
    const createdCard = await cardModel.createNew(newCard)

    const getNewCard = await cardModel.findOneById(createdCard.insertedId)
    if (getNewCard) {
      await columnModel.pushCardOrderIds(getNewCard)

    }
    return getNewCard
  } catch (error) { throw error }
}

export const cardService = {
  createNew,
}