import { z } from 'zod'

export type Open5eItemType = 'items' | 'magicitems'

const Open5eListResponseSchema = z.object({
  count: z.number().int().nonnegative(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(z.object({
    key: z.string(),
    name: z.string(),
    desc: z.string().nullish(),
    category: z.object({
      name: z.string(),
      key: z.string()
    }).nullish(),
    rarity: z.object({
      name: z.string(),
      key: z.string()
    }).nullish(),
    cost: z.union([z.string(), z.number()]).nullish(),
    document: z.object({
      name: z.string().nullish(),
      display_name: z.string().nullish()
    }).nullish()
  }).passthrough())
})

export type Open5eItemList = z.infer<typeof Open5eListResponseSchema>

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
      search: options.search,
      category: options.category
    }
  })

  return Open5eListResponseSchema.parse(response)
}
