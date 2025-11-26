<script setup lang="ts">
import type { CustomHTMLElementEvent } from '@/models/customHTMLElementEvent.ts'

const { placeholder } = defineProps(['placeholder'])
const emit = defineEmits(['search'])

</script>

<template>
  <div class="search-playlists-area">
    <input
      type="search"
      :placeholder="placeholder"
      @search="(event: CustomHTMLElementEvent<HTMLInputElement>) => emit('search', event?.target?.value)"
      class="search-playlists-input"
    />
  </div>
</template>

<style scoped>

.search-playlists-area {
  width: 100%;
}

input {
  width: 100%;
  border-radius: 1rem;
  background-color: var(--search-background-color);
  color: white;
  padding: 0.75rem 1rem;
  border: 1px solid var(--search-border-color);
}

::placeholder {
  color: var(--subtitle-color);
}

::-webkit-search-cancel-button {
  -webkit-appearance: none;
  height: 0.75rem;
  width: 0.75rem;
  border-radius: 100%;
  background-image: url("/clear-search.svg");

}

</style>
