<script setup lang="ts">
const {song} = defineProps(['song'])
</script>

<template>
  <div :class="'music-card ' + song?.color + '-card'">
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
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: flex-start;
  align-items: center;
  border-radius: 1rem;
  width: 100%;
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
