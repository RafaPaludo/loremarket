import { Open5eItemListSchema, type Open5eItemList } from './items.schema'

export type Open5eItemType = 'items' | 'magicitems'

export async function fetchOpen5eItems(options: {
  type: Open5eItemType
  page: number
  limit: number
  search?: string
  category?: string
}): Promise<Open5eItemList> {
  const config = useRuntimeConfig()
  const response: unknown = await $fetch(`${config.open5eApiBaseUrl}/${options.type}/`, {
    query: {
      page: options.page,
      limit: options.limit,
      ordering: 'name',
      // busca correspondência da busca na OpenApi5e
      name__icontains: options.search,
      category: options.category
    }
  })

  return Open5eItemListSchema.parse(response)
}
