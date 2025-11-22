<script setup lang="ts">
const { song, hidden } = defineProps(['song', 'hidden'])
</script>

<template>
  <div v-if="!hidden" :class="'music-card ' + song?.color + '-card'" ref="card-ref">
    <p>{{ song?.artist }}</p>
    <p class="year">{{ song?.year }}</p>
    <p>{{ song?.name }}</p>
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
  min-height: var(--card-height);
  min-width: var(--card-width);
}

.year {
  font-size: 3rem;
}

</style>
