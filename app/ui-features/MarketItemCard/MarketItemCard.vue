<template>
  <UCard>
    <template #header>
      <img
        v-if="item.imageSource"
        class="aspect-[4/3] w-full object-cover"
        :src="item.imageSource"
        :alt="item.imageAlt"
        loading="lazy"
      >
      <div
        v-else
        class="flex aspect-[4/3] items-center justify-center bg-muted"
      >
        <UIcon
          name="i-lucide-package"
          class="size-10 text-muted"
        />
      </div>
    </template>

    <div class="space-y-2">
      <div class="flex items-start justify-between gap-2">
        <h2 class="font-semibold text-highlighted">
          {{ item.name }}
        </h2>
        <span class="shrink-0 text-sm text-muted">
          {{ item.rarity ?? item.category ?? 'Item' }}
        </span>
      </div>

      <p class="text-sm text-muted">
        {{ item.description }}
      </p>

      <p class="font-semibold">
        {{ priceLabel }}
      </p>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { MarketItem } from '~~/shared/types/market-item'

const props = defineProps<{
  item: MarketItem
}>()

const priceLabel = computed(() => props.item.price === null
  ? 'Preço indisponível'
  : `${new Intl.NumberFormat('pt-BR').format(props.item.price)} po`)
</script>
