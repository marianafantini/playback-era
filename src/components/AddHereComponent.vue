<script setup lang="ts">
import { Button } from 'ant-design-vue'
</script>

<template>
  <div class="select-timeline-button-wrapper">
    <Button class="select-timeline-button"
            type="dashed"
            shape="circle"
            @click="$emit('selectTimelineForSong')">
      +
    </Button>
  </div>
</template>

<style scoped>
.select-timeline-button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.select-timeline-button {
  border-color: #638e8e;
  background-color: #2f4040;
  color: #638e8e;
}

.select-timeline-button:hover {
  border: 0.1rem dashed #84acac;
  background-color: #425a5a;
  color: #84acac;
}

</style>
