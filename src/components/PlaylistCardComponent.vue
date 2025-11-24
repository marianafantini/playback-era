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
  border: 0.1rem solid;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  height: var(--card-height);
  width: var(--card-width);
}

.playlist-cover {
  max-width: calc(var(--card-width) * 0.7);
  height: auto;
}

p {
  text-wrap: wrap;
}

</style>
