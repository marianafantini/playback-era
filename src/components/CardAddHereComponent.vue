<script setup lang="ts">
const {song} = defineProps(['song'])
import {PlusOutlined} from "@ant-design/icons-vue";
</script>

<template>
  <div class="music-card"
       @click="$emit('selectTimelineForSong')">
    <div>
      <PlusOutlined/>
      Add here
    </div>
  </div>
</template>

<style scoped>

.music-card {
  border: 0.1rem dashed var(--color);
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  cursor: pointer;
}

@media (max-width: 25rem) {
  .music-card {
    width: 100%;
  }
}

@media (min-width: 25rem) {
  .music-card {
    min-width: var(--card-width);
    min-height: var(--card-height);
  }
}

</style>
