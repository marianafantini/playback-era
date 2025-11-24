<script setup lang="ts">
import LoginWithSpotify from "@/components/LoginWithSpotify.vue";
import {Card} from "ant-design-vue"
</script>

<template>
  <main>
    <h1 class="game-title">Playback Era</h1>

    <Card class="card-how-to-play">
      <div class="content">
        <h2>Como jogar:</h2>
        <ol>
          <li>Escolha uma playlist do spotify</li>
          <li>Ouça a música</li>
          <li>Adivinhe o ano</li>
        </ol>
      </div>

    </Card>

    <LoginWithSpotify/>
  </main>
</template>

<style>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.game-title {
  font-size: 6rem;
  margin: 3rem 2rem;
}

.card-how-to-play {
  margin-bottom: 3rem;
  background-color: transparent;
  border-color: transparent;
}

</style>
