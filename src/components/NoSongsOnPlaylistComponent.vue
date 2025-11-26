<script setup lang="ts"></script>

<template>
  <div class="empty-page">
    <img src="/src/assets/empty.gif" class="empty-gif" />
    <h2>Não encontramos músicas para jogar com essa playlist</h2>
  </div>
</template>

<style scoped>
.empty-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  min-height: 50vh;
  text-align: center;
}

.empty-gif {
  height: 10rem;
}
</style>
