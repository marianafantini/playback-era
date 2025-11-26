<script setup lang="ts">

import WinTrophyComponent from '@/components/WinTrophyComponent.vue'

const { correctSongs } = defineProps(['correctSongs', 'totalSongs'])

</script>

<template>
  <div class="win-header-message">
    <WinTrophyComponent />
    <h3>
      Parabéns!!
    </h3>
    <p> Você acertou {{ correctSongs }} {{ correctSongs > 1 ? 'músicas' : 'música' }}</p>
  </div>
</template>

<style scoped>

.win-header-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.win-header-message h3 {
  font-size: 2rem;
  font-weight: bold;
}

.win-header-message p {
  font-size: 1.25rem;
}

</style>
