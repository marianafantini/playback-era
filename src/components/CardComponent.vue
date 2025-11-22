<script setup lang="ts">
import AddHereComponent from '@/components/AddHereComponent.vue'

const { song, hidden } = defineProps(['song', 'hidden'])

</script>

<template>
  <div v-if="!hidden" :class="'music-card ' + song?.color + '-card'" ref="card-ref">
    <p>{{ song?.artist }}</p>
    <p class="year">{{ song?.year }}</p>
    <p>{{ song?.name }}</p>
  </div>

  <div v-if="!hidden" class="add-here-button">
    <AddHereComponent @click="$emit('selectTimelineForSong')"></AddHereComponent>
  </div>
</template>

<style scoped>
.add-here-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.music-card {
  border: 0.1rem solid;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  min-height: 10rem;
  min-width: 10rem;
}

.year {
  font-size: 3rem;
}
</style>
