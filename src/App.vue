<script setup lang="ts">
import {RouterView, RouterLink, useRouter} from 'vue-router'
import { inject } from "@vercel/analytics"
inject()
const router = useRouter();
</script>

<template>
  <header v-if="router?.currentRoute.value.name !== 'home'">
    <div class="header-logo" @click="router.push('/')">
      <img src="/public/mp3-icon.png"
           alt="Logo of the app, which is an mp3 player icon"
           class="logo"/>
      <span class="logo-title">Playback Era</span>
    </div>

    <nav>
      <RouterLink to="/select-playlist">Playlists</RouterLink>
    </nav>
  </header>

  <RouterView/>
</template>

<style scoped>

header {
  display: flex;
  gap: 1rem;
}

header nav {
  display: flex;
  gap: 1rem;
}

header a {
  color: var(--color);
  cursor: pointer;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.logo {
  height: 1.5rem;
}

.logo-title {
  font-weight: 500;
}

</style>
