<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { SpeedInsights } from "@vercel/speed-insights/vue"
import { Analytics } from '@vercel/analytics/vue';
import BackToPlaylistsHeader from '@/components/BackToPlaylistsHeader.vue'
import BackToHomeHeader from '@/components/BackToHomeHeader.vue'

const router = useRouter()
</script>

<template>
  <header>
    <Analytics :mode="import.meta.env.MODE" />
    <SpeedInsights/>
    <div
      @click="router.push('/')"
      v-if="router.currentRoute.value.name === 'home'"
      class="header-logo"
    >
      <div class="playback-era-logo">
        <img src="/music-note.svg" />
      </div>
      <div>
        <h1>Playback Era</h1>
        <p class="header-subtitle">Desafio musical</p>
      </div>
    </div>
    <div v-if="router.currentRoute.value.name === 'select-playlist'">
      <BackToHomeHeader :title="'Escolha uma playlist'" :subtitle="'Suas playlists do Spotify'" />
    </div>
    <div
      v-if="
        router.currentRoute.value.name !== 'home' &&
        router.currentRoute.value.name !== 'select-playlist'
      "
    >
      <BackToPlaylistsHeader />
    </div>
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
  gap: 1rem;
  cursor: pointer;
}

.header-logo img {
  margin-top: 0.5rem;
  height: 4rem;
}

.header-logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
}

.header-logo .header-subtitle {
  font-size: 1rem;
  color: var(--subtitle-color);
}

.playback-era-logo {
  background-image: linear-gradient(to bottom right, #9333ea, #8b5cf6);
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  box-shadow:
    var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.playback-era-logo img {
  height: 2rem;
  color: white;
}
</style>
