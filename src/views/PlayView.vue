<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
import AddHereComponent from '@/components/AddHereComponent.vue'
import { usePlaylistStore } from '@/stores/playlist'
import gsap from 'gsap'

import { RoughEase } from 'gsap/EasePack'

gsap.registerPlugin(RoughEase)

import { onBeforeMount, onMounted, ref, useTemplateRef } from 'vue'

const playlistStore = usePlaylistStore()

onBeforeMount(() => {
  playlistStore.initPlaylist()
  playlistStore.getNextSong()
})

onMounted(() => {
  setInitialSong()
  playlistStore.playSong()
})

const setInitialSong = () => {
  playlistStore.addPlayedSong(playlistStore.currentSong, 0)
  playlistStore.getNextSong()
}

const selectTimelineForSong = (index) => {
  const response = playlistStore.addPlayedSong(playlistStore.currentSong, index + 1)
  const referenceName = playlistStore.getReference(playlistStore.currentSong)

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
        <CardComponent :hidden="true" :song="playlistStore.currentSong"></CardComponent>
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

</style>
