<template>
  <UPageHero
    v-if="content"
    :title="content.title"
    :description="content.description"
    orientation="vertical"
    reverse
    class="py-10"
  >
    <img
      :src="content.image.source"
      :alt="content.image.alt"
    >
  </UPageHero>
</template>

<script setup lang="ts">
const { data: content } = await useAsyncData('merchant-hero-content', () =>
  queryCollection('merchantHero').path('/merchanthero').first()
)
</script>
