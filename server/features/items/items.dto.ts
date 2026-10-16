import type { Open5eItemList } from '../../integrations/open5e/items'
import type { Item, ItemList, ItemQuery } from './items.schema'

export function toItemDto(item: Open5eItemList['results'][number]): Item {
  const price = item.cost == null ? null : Number(item.cost)

  return {
    id: item.key,
    name: item.name,
    category: item.category?.name ?? null,
    rarity: item.rarity?.name ?? null,
    description: item.desc ?? '',
    price: price !== null && Number.isFinite(price) ? price : null,
    priceUnit: 'gp',
    imageSource: null,
    imageAlt: `Imagem indisponível para ${item.name}`,
    source: item.document?.display_name ?? item.document?.name ?? null
  }
}

export function toItemListDto(
  response: Open5eItemList,
  query: Pick<ItemQuery, 'page' | 'limit'>
): ItemList {
  return {
    count: response.count,
    page: query.page,
    limit: query.limit,
    hasNextPage: response.next !== null,
    items: response.results.map(toItemDto)
  }
}
