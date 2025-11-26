<script setup lang="ts">
import WinTrophyComponent from '@/components/WinTrophyComponent.vue'
import ButtonComponent from '@/components/atoms/ButtonComponent.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { correctSongs } = defineProps(['correctSongs'])

const emit = defineEmits(['restartGame'])
</script>

<template>
  <div class="win-header-message">
    <WinTrophyComponent />
    <h3>Parabéns!!</h3>
    <p>Você acertou {{ correctSongs }} {{ correctSongs > 1 ? 'músicas' : 'música' }}</p>

    <div class="button-actions">
      <ButtonComponent content="Jogar de novo" @click="emit('restartGame')" />
      <ButtonComponent content="Trocar de playlist" @click="router.push('/select-playlist')" />
    </div>
  </div>
</template>

<style scoped>
.button-actions {
  display: flex;
  gap: 1rem;
}

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
