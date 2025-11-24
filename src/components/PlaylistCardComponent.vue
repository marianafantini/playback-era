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
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  min-width: var(--card-width);
  max-width: calc(var(--card-width) * 1.2);
  height: var(--card-height);
}

.playlist-cover {
  max-width: calc(var(--card-width) * 0.7);
  height: auto;
  border-radius: 0.8rem;
}

p {
  text-wrap: wrap;
  font-weight: 600;
}

</style>
