import { getItemsController } from '../../features/items/items.controller'

export default defineEventHandler((event) => {
  return getItemsController(getQuery(event))
})
