<script setup lang="ts">
const { round, totalRounds } = defineProps(['round', 'totalRounds'])
</script>

<template>
  <p>
    Rodada {{ round }}
    de
    {{ totalRounds }}
  </p>
</template>

<style scoped>

p {
  font-size: 0.9rem;
  color: #8b8d94;
}

</style>
