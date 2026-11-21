import { z } from 'zod'

// Esse schema de itens é provisório, ainda estou estudando o formato ideal, isso vai depender muito de quais campos queremos mostrar no card no front
const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string().nullable(),
  rarity: z.string().nullable(),
  description: z.string(),
  price: z.number().nullable(),
  priceUnit: z.literal('gp'),
  imageSource: z.string().nullable(),
  imageAlt: z.string(),
  source: z.string().nullable()
})

export const ItemCatalogSearchSchema = {
  query: z.object({
    search: z.string().trim().max(100).optional(),
    category: z.string().trim().max(80).optional(),
    type: z.enum(['items', 'magicitems']).default('items'),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20)
  }),
  response: {
    item: itemSchema,
    list: z.object({
      count: z.number().int().nonnegative(),
      page: z.number().int().positive(),
      limit: z.number().int().positive(),
      hasNextPage: z.boolean(),
      items: z.array(itemSchema)
    })
  }
}

export type ItemCatalogSearchQuery = z.output<typeof ItemCatalogSearchSchema.query>
export type Item = z.infer<typeof ItemCatalogSearchSchema.response.item>
export type ItemCatalogSearchResponse = z.infer<typeof ItemCatalogSearchSchema.response.list>
