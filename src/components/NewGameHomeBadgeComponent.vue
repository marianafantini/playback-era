<script setup lang="ts"></script>

<template>
  <div class="new-game-badge">
    <img src="/sparkle.svg" />
    Novo jogo
  </div>
</template>

<style scoped>
.new-game-badge {
  padding: 0.3rem 1rem;
  border: 1px solid rgb(250 204 21/0.4);
  background-color: rgb(250 204 21/0.2);
  border-radius: 1.5rem;
  color: rgb(254 240 138);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.new-game-badge img {
  height: 1rem;
}
</style>
