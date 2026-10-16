<template>
  <UCard>
    <template #header>
      <img
        class="aspect-[4/3] w-full object-cover"
        :src="item.image.source"
        :alt="item.image.alt"
        loading="lazy"
      >
    </template>

    <div class="space-y-2">
      <div class="flex items-start justify-between gap-2">
        <h2 class="font-semibold text-highlighted">
          {{ item.name }}
        </h2>
        <span class="shrink-0 text-sm text-muted">
          {{ item.rarity }}
        </span>
      </div>

      <p class="text-sm text-muted">
        {{ item.description }}
      </p>

      <p class="font-semibold">
        {{ item.price }}
      </p>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { MarketItem } from './MarketItem'

defineProps<{
  item: MarketItem
}>()
</script>
