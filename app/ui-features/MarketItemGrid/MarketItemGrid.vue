<template>
  <UContainer>
    <UPageGrid :ui="{ base: 'grid-cols-2 lg:grid-cols-4' }">
      <MarketItemCard
        v-for="item in data?.items ?? []"
        :key="item.id"
        :item="item"
      />
      <p
        v-if="pending"
        class="col-span-full text-center text-muted"
      >
        Carregando itens...
      </p>
      <p
        v-else-if="error"
        class="col-span-full text-center text-muted"
        role="alert"
      >
        Não foi possível carregar os itens. Tente novamente mais tarde.
      </p>
      <p
        v-else-if="!data?.items.length"
        class="col-span-full text-center text-muted"
      >
        Nenhum item encontrado.
      </p>
    </UPageGrid>
  </UContainer>
</template>

<script setup lang="ts">
import MarketItemCard from '~/ui-features/MarketItemCard/MarketItemCard.vue'
import type { MarketItemsResponse } from '~~/shared/types/market-item'

const { data, pending, error } = await useFetch<MarketItemsResponse>('/api/items')
</script>
