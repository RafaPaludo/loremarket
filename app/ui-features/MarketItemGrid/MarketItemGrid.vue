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
        v-else-if="hasSearched && !data?.items.length"
        class="col-span-full text-center text-muted"
      >
        Nenhum item encontrado.
      </p>
    </UPageGrid>
  </UContainer>
</template>

<script setup lang="ts">
import MarketItemCard from '~/ui-features/MarketItemCard/MarketItemCard.vue'
import type { MarketItemCatalogSearchResponse } from '~~/shared/types/market-item'

const props = defineProps<{
  search: string
  requestId: number
}>()

const emit = defineEmits<{
  'update:pending': [pending: boolean]
}>()

const hasSearched = ref(false)

const { data, pending, error, execute } = await useFetch<MarketItemCatalogSearchResponse>('/api/catalog/items', {
  // Impede que seja feita uma busca inicial.
  immediate: false,
  query: computed(() => ({
    search: props.search || undefined
  }))
})

// Faz o fetch da busca apenas quando o valor de fato mudar
watch(() => props.requestId, async () => {
  hasSearched.value = true
  await execute()
})

watch(pending, value => emit('update:pending', value), { immediate: true })
</script>
