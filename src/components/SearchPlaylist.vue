<script setup lang="ts">
const emit = defineEmits(['searchForPlaylist'])
</script>

<template>
  <div class="search-playlists-area">
    <input
      placeholder="Procurar playlist..."
      @search="searchForPlaylist"
      @change="(event) => emit('searchForPlaylist', event.target.value)"
      class="search-playlists-input"
    />
  </div>
</template>

<style scoped>

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

</style>
