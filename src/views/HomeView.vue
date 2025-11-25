<script setup lang="ts">
import LoginWithSpotify from '@/components/LoginWithSpotify.vue'
</script>

<template>
  <main>
    <div class="game-title">
      <img src="/public/mp3-icon.png" alt="Logo of the app, which is an mp3 player icon" />
      <h1>Playback Era</h1>
    </div>

    <div class="card-how-to-play">
      <ul>
        <li>
          <div class="icon">
            <img src="/public/2024_Spotify_logo_without_text_(black).svg" />
          </div>
          <div>
            <h3>Escolha uma playlist do spotify</h3>
            <p>Escolha uma de suas playlists favoritas</p>
          </div>
        </li>
        <li>
          <div class="icon">
            <img src="/public/480-4806365_music-notes-svg-cut-file-hd-png-download.png" />
          </div>
          <div>
            <h3>Ouça a música</h3>
            <p>Você vai ouvir um trecho de uma música</p>
          </div>
        </li>
        <li>
          <div class="icon">
            <img src="/public/calendar-icon.png" />
          </div>
          <div>
            <h3>Adivinhe o ano</h3>
            <p>Coloque a música na posição correta da linha do tempo</p>
          </div>
        </li>
      </ul>
    </div>

    <LoginWithSpotify />
  </main>
</template>

<style>
main {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 90vh;
  width: 100%;
}

.game-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  gap: 1.5rem;
}

.game-title h1 {
  font-size: 2.5rem;
}

.game-title img {
  height: 4rem;
  margin-top: 0.5rem;
}

.card-how-to-play {
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-how-to-play ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card-how-to-play li {
  display: flex;
  align-items: center;
  gap: 1rem;
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

.card-how-to-play li h3 {
  font-weight: bold;
}

@media (min-width: 40rem) {
  main {
    justify-content: center;
    min-height: 70vh;
  }

  .game-title h1 {
    font-size: 6rem;
  }

  .game-title img {
    height: 5rem;
  }

  .game-title {
    margin: 3rem 2rem;
  }
}
</style>
