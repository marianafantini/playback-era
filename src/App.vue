<script setup lang="ts">
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { inject } from '@vercel/analytics'
inject()
const router = useRouter()
</script>

<template>
  <header>
    <div class="header-logo" @click="router.push('/')">
      <img src="/src/assets/icons/mp3-icon.png" alt="Logo of the app, which is an mp3 player icon" />
      <div>
        <h1>Playback Era</h1>
        <p class="header-subtitle">Desafio musical</p>
      </div>
    </div>

    <nav>
      <RouterLink to="/select-playlist" v-if="router.currentRoute.value.name === 'play'">Playlists</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
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

.header-logo img {
  margin-top: 0.5rem;
  height: 4rem;
}
.header-logo h1 {
  font-size: 1.5rem;
}

.header-logo .header-subtitle {
  font-size: 1rem;
  color: var(--subtitle-color);
}

</style>
