<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
import AddHereComponent from '@/components/AddHereComponent.vue'
import { usePlaylistStore } from '@/stores/playlist'

import { onBeforeMount, onMounted } from 'vue'
import PlayerComponent from '@/components/PlayerComponent.vue'

const playlistStore = usePlaylistStore()

onBeforeMount(() => {
  playlistStore.initPlaylist()
  playlistStore.getNextSong()
})

onMounted(() => {
  setInitialSong()
  // playlistStore.playSong()
})

const setInitialSong = () => {
  const response = playlistStore.currentSong ? playlistStore.addPlayedSong(playlistStore.currentSong, 0) : false
  playlistStore.getNextSong()
}

const selectTimelineForSong = (index: number) => {
  const response = playlistStore.currentSong ? playlistStore.addPlayedSong(playlistStore.currentSong, index + 1) : false

  if (response) {
    console.log('parabéns')
  } else {
    console.log('oops')
  }

  playlistStore.getNextSong()
}

</script>

<template>
  <main>
    <h1>Music!</h1>

    <section class="game-board">
      <section>
        <!--   show current card without song info   -->
        <PlayerComponent :hidden="true"
                         :song="playlistStore.currentSong"
                         @playSong="playSong"
                         @pauseSong="pauseSong">

        </PlayerComponent>
      </section>

      <section>
        <!--   cards that the user has, in timeline   -->
        <div class="cards-in-timeline">
          <AddHereComponent @selectTimelineForSong="selectTimelineForSong(-1)"></AddHereComponent>
          <CardComponent
            v-for="(song, index) in playlistStore.playedSongs"
            class="cards-in-timeline-repeat"
            @selectTimelineForSong="selectTimelineForSong(index)"
            :song="song"
            ref="cards"
          ></CardComponent>
        </div>
      </section>

      <div class="hidden">
        <div id="music-player"></div>
      </div>
    </section>
  </main>
</template>

<style scoped>

.game-board {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  min-height: 70vh;
}

.cards-in-timeline,
.cards-in-timeline-repeat {
  display: flex;
  gap: 1rem;
}

.hidden {
  display: none !important;
}

</style>
