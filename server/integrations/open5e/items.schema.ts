import { z } from 'zod'

export const Open5eItemListSchema = z.object({
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

export type Open5eItemList = z.infer<typeof Open5eItemListSchema>
