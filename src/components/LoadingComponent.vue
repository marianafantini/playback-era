<script setup lang="ts">

import MusicBarsComponent from '@/components/MusicBarsComponent.vue'

const niceLoadingMessages = [
  'Procurando músicas...',
  'Procurando o fone de ouvido...',
  'Buscando por músicas nostálgicas'
]

const randomIndex = Math.floor(Math.random() * niceLoadingMessages.length)

</script>

<template>
  <div class="loading-view">

    <MusicBarsComponent />

    {{niceLoadingMessages[randomIndex]}}
  </div>
</template>

<style scoped>

.loading-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  min-height: 60vh;
  color: var(--subtitle-color);
  font-size: 1.5rem;
}
</style>
