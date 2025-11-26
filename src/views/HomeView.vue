<script setup lang="ts">
import LoginWithSpotifyComponent from '@/components/LoginWithSpotifyComponent.vue'
import TestWithoutLoginComponent from '@/components/TestWithoutLoginComponent.vue'

const steps = [
  {
    icon: '/src/assets/icons/480-4806365_music-notes-svg-cut-file-hd-png-download.png',
    title: 'Escolha uma playlist',
    description: 'Selecione sua playlist favorita',
    color: 'from-green-400 to-emerald-500'
  },
  {
    icon: '/src/assets/icons/calendar-icon.png',
    title: 'Ouça o trecho',
    description: 'Escute uma música aleatória',
    color: 'from-pink-400 to-rose-500'
  },
  {
    icon: '/src/assets/icons/calendar-icon.png',
    title: 'Adivinhe o ano',
    description: 'Coloque a música na linha do tempo',
    color: 'from-purple-400 to-indigo-500'
  }
]

</script>

<template>
  <main>
    <h2 class="subtitle">Adivinhe o ano de lançamento das suas músicas favoritas</h2>

    <div class="card-how-to-play">
      <h3>Como jogar</h3>
      <ul>
        <li v-for="item in steps">
          <div class="icon">
            <img :src="item.icon" />
          </div>
          <div>
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="login-with-spotify">
      <LoginWithSpotifyComponent />
      <TestWithoutLoginComponent />
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

h2 {
  margin-top: 1rem;
}

.subtitle {
  text-align: center;
  font-weight: 600;
}

.game-title h1 {
  font-size: 1.5rem;
  font-weight: 500;
}

.game-title img {
  height: 2.5rem;
  margin-top: 0.5rem;
}

.card-how-to-play {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-how-to-play h3 {
  text-transform: uppercase;
  padding: 0 1.3rem;
  font-weight: 500;
  color: #d8b4fe;
}

.card-how-to-play ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-left: 0;
  margin-right: 0;
}

.card-how-to-play li {
  border-radius: 1rem;
  padding: 1rem;
  background-color: var(--home-cards-background-color);;
  border: 1px solid var(--home-cards-border-color);;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-how-to-play div {
  width: 70%;
}

.card-how-to-play .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  border-radius: 100%;
}

.card-how-to-play li:nth-of-type(1) .icon {
  background-color: #93bca6;
}

.card-how-to-play li:nth-of-type(2) .icon {
  background-color: #bc81b6;
}

.card-how-to-play li:nth-of-type(3) .icon {
  background-color: #8183bc;
}

.card-how-to-play li img {
  height: 1.5rem;
}

.card-how-to-play li h4 {
  font-weight: 500;
  font-size: 1.3rem;
}

.card-how-to-play li p {
  color: #cbd5e1;
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

  .game-title h1 {
    font-size: 4rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .game-title img {
    height: 5rem;
  }
}
</style>
