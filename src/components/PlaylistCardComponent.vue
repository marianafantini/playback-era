<script setup lang="ts">
const { playlist } = defineProps(["playlist"]);
</script>

<template>
  <div class="playlist-card">
    <img
      :src="playlist.cover"
      alt="Playlist Cover Image"
      class="playlist-cover"
    />
    <div class="playlist-information">
      <p>{{ playlist.name }}</p>
      <p class="subtitle">{{ playlist.amountOfTracks }} músicas</p>
    </div>
  </div>
</template>

<style scoped>
.playlist-card {
  border: 1px solid var(--cards-border-color);
  background-color: var(--cards-background-color);
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  gap: 0.5rem;
  flex-direction: column;
  border-radius: 1rem;
  height: 100%;
  width: auto;
}

.playlist-information {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.playlist-cover {
  align-self: center;
  max-width: calc(var(--card-width) * 0.9);
  height: auto;
  border-radius: 0.8rem;
}

p {
  font-weight: 600;
  font-size: 1rem;
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
  color: var(--subtitle-color);
}
</style>
