<template>
  <div>
    <MerchantHero />
    <USeparator />
    <MarketSearch
      :loading="isSearching"
      @search="searchItems"
    />
    <MarketItemGrid
      :search="searchQuery"
      :request-id="searchRequestId"
      @update:pending="isSearching = $event"
    />
  </div>
</template>

<script setup lang="ts">
import MerchantHero from '~/ui-features/MerchantHero/MerchantHero.vue'
import MarketItemGrid from '~/ui-features/MarketItemGrid/MarketItemGrid.vue'
import MarketSearch from '~/ui-features/MarketSearch/MarketSearch.vue'

const searchQuery = ref('')
const searchRequestId = ref(0)
const isSearching = ref(false)

function searchItems(query: string) {
  searchQuery.value = query
  searchRequestId.value++
}
</script>
