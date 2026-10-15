import { defineCollection, defineContentConfig } from '@nuxt/content'
import { resolve } from 'node:path'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    merchantHero: defineCollection({
      type: 'page',
      source: {
        cwd: resolve('app/ui-features/MerchantHero'),
        include: 'merchantHero.md',
        prefix: '/'
      },
      schema: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        image: z.object({
          source: z.string().min(1),
          alt: z.string().min(1)
        })
      })
    })
  }
})
