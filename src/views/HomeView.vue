<script setup lang="ts">
import LoginWithSpotifyComponent from '@/components/LoginWithSpotifyComponent.vue'
import NewGameHomeBadgeComponent from '@/components/NewGameHomeBadgeComponent.vue'
import HomeHowToPlayComponent from '@/components/HomeHowToPlayComponent.vue'
import ButtonComponent from '@/components/atoms/ButtonComponent.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const steps = ref([
  {
    icon: '/music-note.svg',
    title: 'Escolha uma playlist',
    description: 'Selecione sua playlist favorita',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: '/play.svg',
    title: 'Ouça o trecho',
    description: 'Escute uma música aleatória',
    color: 'from-pink-400 to-rose-500',
  },
  {
    icon: '/calendar.svg',
    title: 'Adivinhe o ano',
    description: 'Coloque a música na linha do tempo',
    color: 'from-purple-400 to-indigo-500',
  },
])

</script>

<template>
  <main>
    <NewGameHomeBadgeComponent />
    <h2 class="home-subtitle-cta">Adivinhe o ano de lançamento das suas músicas favoritas</h2>

    <HomeHowToPlayComponent :steps="steps" />

    <div class="login-with-spotify">
      <LoginWithSpotifyComponent />
      <ButtonComponent
        content="Testar sem login"
        @click="router.push('/free-test?playlist=008G1BbvK1NQvbAV8MHvDz')"
      />
    </div>
  </main>
</template>

<style>
main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  min-height: 90vh;
  width: 100%;
}

.home-subtitle-cta {
  text-align: center;
  font-weight: 700;
  font-size: 1.75rem;
  width: 100%;
}

.login-with-spotify {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 40rem) {
  main {
    justify-content: center;
    min-height: 70vh;
  }

  .home-subtitle-cta {
    font-size: 1.1rem;
  }
}
</style>
