<script setup lang="ts">
const { playlist } = defineProps(['playlist'])
</script>

<template>
  <div class="playlist-card">
    <img :src="playlist.cover" alt="Playlist Cover Image" class="playlist-cover" />
    <div class="playlist-information">
      <p>{{ playlist.name }}</p>
      <p class="subtitle">{{ playlist.amountOfTracks }} músicas</p>
    </div>
  </div>
</template>

<style scoped>

.playlist-card {
  border-color: transparent;
  background-color: var(--cards-background-color);
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  gap: 1.5rem;
  border-radius: 1rem;
  height: 100%;
  width: 100%;
}

.playlist-information {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: center;
}

.playlist-cover {
  align-self: center;
  max-width: calc(var(--card-width) * 0.7);
  height: auto;
  border-radius: 0.8rem;
}

p {
  font-weight: 600;
  overflow-wrap: anywhere;
}

@media (min-width: 40rem) {
  .playlist-card {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 2rem;
    max-width: var(--card-width);
  }

  .playlist-information {
    align-self: flex-start;
  }
}

.subtitle {
  font-size: 0.8rem;
  font-weight: 400;
  color: #8b8d94;
}

</style>
