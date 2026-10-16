import { z } from 'zod'

export const ItemQuerySchema = z.object({
  search: z.string().trim().max(100).optional(),
  category: z.string().trim().max(80).optional(),
  type: z.enum(['items', 'magicitems']).default('items'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20)
})

export const ItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string().nullable(),
  rarity: z.string().nullable(),
  description: z.string(),
  price: z.number().finite().nullable(),
  priceUnit: z.literal('gp'),
  imageSource: z.string().nullable(),
  imageAlt: z.string(),
  source: z.string().nullable()
})

export const ItemListSchema = z.object({
  count: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  hasNextPage: z.boolean(),
  items: z.array(ItemSchema)
})

export type ItemQuery = z.output<typeof ItemQuerySchema>
export type Open5eItemType = ItemQuery['type']
export type Item = z.infer<typeof ItemSchema>
export type ItemList = z.infer<typeof ItemListSchema>
