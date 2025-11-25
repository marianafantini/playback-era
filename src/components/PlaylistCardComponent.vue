<script setup lang="ts">
const {playlist} = defineProps(['playlist'])
</script>

<template>
  <div class="music-card">
    <img :src="playlist.cover"
         alt="Playlist Cover Image"
         class="playlist-cover"/>
    <p>{{ playlist.name }}</p>
  </div>
</template>

<style scoped>

.music-card {
  border-color: transparent;
  background-color: var(--cards-background-color);
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  gap: 1.5rem;
  align-items: center;
  border-radius: 1rem;
  height: 100%;
  width: 100%;
}

.playlist-cover {
  max-width: calc(var(--card-width) * 0.7);
  height: auto;
  border-radius: 0.8rem;
}

p {
  font-weight: 600;
  overflow-wrap: anywhere;
}

@media (min-width: 40rem) {
  .music-card {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 2rem;
    max-width: var(--card-width);
  }
}

</style>
