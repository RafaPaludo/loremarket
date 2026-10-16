export interface Image {
  source: string
  alt: string
}

export interface MarketItem {
  id: string
  name: string
  rarity: string
  description: string
  price: string
  image: Image
}
