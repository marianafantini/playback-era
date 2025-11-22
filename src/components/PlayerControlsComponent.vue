<script setup lang="ts">
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons-vue'

const emit = defineEmits<{
  (event: 'playSong'): void
  (event: 'pauseSong'): void
}>()

</script>

<template>
  <div class="music-card">
    <PlayCircleOutlined  class="control-icons" @click="emit('playSong')" />
    <PauseCircleOutlined class="control-icons"  @click="emit('pauseSong')" />
  </div>
</template>

<style scoped>

.music-card {
  border: 0.1rem solid;
  padding: 1rem 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  min-height: var(--card-height);
  min-width: var(--card-width);
}

.control-icons {
  font-size: 3rem;
  cursor: pointer;
}

</style>
