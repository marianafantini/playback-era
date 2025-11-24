<script setup lang="ts">
const { playlist } = defineProps(['playlist'])
</script>

<template>
  <div class="music-card">
       <p>{{playlist.name}}</p>
       <p v-if="playlist.description">{{playlist.description}}</p>
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

</style>
