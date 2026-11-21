import { fetchOpen5eItems } from '../../integrations/open5e/items'
import { toItemCatalogSearchResponseDto } from './item-catalog-search.dto'
import { ItemCatalogSearchSchema } from './item-catalog-search.schema'

export async function searchItemCatalogController(query: unknown) {
  const parsedQuery = ItemCatalogSearchSchema.query.safeParse(query)

  if (!parsedQuery.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Parâmetros de busca inválidos',
      data: parsedQuery.error.flatten().fieldErrors
    })
  }

  const { type, page, limit, search, category } = parsedQuery.data
  let response

  try {
    response = await fetchOpen5eItems({ type, page, limit, search, category })
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: 'Não foi possível consultar o catálogo Open5e'
    })
  }

  return ItemCatalogSearchSchema.response.list.parse(
    toItemCatalogSearchResponseDto(response, { page, limit })
  )
}
