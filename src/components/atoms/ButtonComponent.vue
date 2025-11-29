<script setup lang="ts">
const { content } = defineProps(['content']);
const emit = defineEmits(['click']);
</script>

<template>
  <button class="see-more-button" @click="$emit('click')">
    {{ content }}
  </button>
</template>

<style scoped>
.see-more-button {
  cursor: pointer;
  border-radius: 3rem;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 1rem;
  width: 100%;
  background-color: var(--home-cards-background-color);
  color: var(--subtitle-color);
  border: 1px solid var(--home-cards-border-color);
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.see-more-button:hover {
  transform: scale(1.1);
}
</style>
