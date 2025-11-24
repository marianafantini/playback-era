<script setup lang="ts">
import {RouterView, useRouter} from 'vue-router'
const router = useRouter();
</script>

<template>
  <header v-if="router?.currentRoute.value.name !== 'home'">
    <img src="/public/mp3-icon.png"
         alt="Logo of the app, which is an mp3 player icon"
         class="logo"/>
    <span class="logo-title">Playback Era </span>
  </header>

  <RouterView/>
</template>

<style scoped>

header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo {
  height: 1.5rem;
}

.logo-title {
  font-weight: 500;
}

</style>
