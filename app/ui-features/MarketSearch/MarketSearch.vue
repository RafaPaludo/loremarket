<template>
  <form
    class="mx-auto flex w-full max-w-2xl gap-2 px-4 py-6"
    role="search"
    @submit.prevent="submitSearch"
  >
    <UInput
      v-model="searchTerm"
      class="flex-1"
      icon="i-lucide-search"
      placeholder="Buscar itens..."
      aria-label="Buscar itens"
      :loading="loading"
    />
    <UButton
      type="submit"
      icon="i-lucide-search"
      :loading="loading"
    >
      Buscar
    </UButton>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  search: [query: string]
}>()

const searchTerm = ref('')

function submitSearch() {
  emit('search', searchTerm.value.trim())
}
</script>
