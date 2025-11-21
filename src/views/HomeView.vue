<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <h1>Welcome!</h1>

    <RouterLink to="/play">
      <button>Play now!</button>
    </RouterLink>
    <RouterLink to="/how-to-play">
      <button>How to play</button>
    </RouterLink>
  </main>
</template>
