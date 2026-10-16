<template>
  <UContainer>
    <UPageGrid :ui="{ base: 'grid-cols-2 lg:grid-cols-4' }">
      <MarketItemCard
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </UPageGrid>
  </UContainer>
</template>

<script setup lang="ts">
import MarketItemCard from '~/ui-features/MarketItemCard/MarketItemCard.vue'
import type { MarketItem } from '~/ui-features/MarketItemCard/MarketItem'

const items: MarketItem[] = [
  {
    id: 'longsword',
    name: 'Espada longa',
    rarity: 'Comum',
    description: 'Uma lâmina equilibrada, pronta para acompanhar qualquer jornada.',
    price: '50 moedas de ouro',
    image: {
      source: 'https://images.unsplash.com/photo-1774812855895-7f05397e6df2?auto=format&fit=crop&w=800&h=600&q=80',
      alt: 'Detalhe de uma espada medieval com bainha.'
    }
  },
  {
    id: 'healing-potion',
    name: 'Poção de cura',
    rarity: 'Incomum',
    description: 'Um gole rubro que ajuda a recuperar as forças após uma batalha.',
    price: '25 moedas de ouro',
    image: {
      source: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZnJwb3Rpb25fYm90dGxlX21hZ2ljX3BvdGlvbi1pbWFnZS1reWJjemxnaC5qcGc.jpg',
      alt: 'Frasco de vidro com líquido vermelho semelhante a uma poção.'
    }
  },
  {
    id: 'travel-pack',
    name: 'Mochila de viagem',
    rarity: 'Comum',
    description: 'Couro resistente e espaço para levar o essencial pelo caminho.',
    price: '8 moedas de ouro',
    image: {
      source: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&h=600&q=80',
      alt: 'Mochila marrom de couro fotografada sobre fundo claro.'
    }
  },
  {
    id: 'crusader-shield',
    name: 'Escudo do guardião',
    rarity: 'Raro',
    description: 'Um escudo reforçado, marcado pelo símbolo de uma antiga ordem.',
    price: '75 moedas de ouro',
    image: {
      source: 'https://images.unsplash.com/photo-1738697216337-8b2f83ee28b4?auto=format&fit=crop&w=800&q=80',
      alt: 'Escudo medieval branco com uma cruz vermelha.'
    }
  }
]
</script>
