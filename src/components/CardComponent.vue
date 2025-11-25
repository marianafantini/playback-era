<script setup lang="ts">
const { song, id } = defineProps(['song', 'id'])
</script>

<template>
  <div :id="id" :class="'music-card ' + song?.color + '-card '">
    <img :src="song.image" :alt="'Imagem da música ' + song.name" class="song-image">
    <div>
      <p class="song-name">{{ song?.name }}</p>
      <p class="song-artist">{{ song?.artist }}</p>
      <p class="song-year">{{ song?.year }}</p>
    </div>
  </div>
</template>

<style scoped>

.song-image {
  height: 5rem;
}

.music-card {
  border: 0.1rem solid;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: flex-start;
  align-items: center;
  border-radius: 1rem;
  width: 100%;
}

@media (min-width: 40rem) {
  .music-card {
    min-width: var(--card-width);
    width: calc(var(--card-width) * 1.2);
    height: var(--card-height);
  }
}

.song-artist {
  font-style: italic;
  font-size: 0.8rem;
}

.song-name {
  font-weight: bold;
}

.song-year {
  font-size: 1.5rem;
}

</style>
