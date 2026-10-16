export type Open5eItemType = 'items' | 'magicitems'

export interface MarketItem {
  id: string
  name: string
  category: string | null
  rarity: string | null
  description: string
  price: number | null
  priceUnit: 'gp'
  imageSource: string | null
  imageAlt: string
  source: string | null
}

export interface MarketItemsResponse {
  count: number
  page: number
  limit: number
  hasNextPage: boolean
  items: MarketItem[]
}
