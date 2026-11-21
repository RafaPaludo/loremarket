import { searchItemCatalogController } from '../../features/item-catalog/item-catalog-search.controller'

export default defineEventHandler((event) => {
  return searchItemCatalogController(getQuery(event))
})
