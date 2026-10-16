import { fetchOpen5eItems } from '../../integrations/open5e/items'
import { toItemListDto } from './items.dto'
import { ItemListSchema, ItemQuerySchema } from './items.schema'

export async function getItemsController(query: unknown) {
  const parsedQuery = ItemQuerySchema.safeParse(query)

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

  return ItemListSchema.parse(toItemListDto(response, { page, limit }))
}
