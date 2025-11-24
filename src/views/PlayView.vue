<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
import {usePlaylistStore} from '@/stores/playlist'

import {onBeforeMount} from 'vue'
import PlayerComponent from '@/components/PlayerComponent.vue'
import CardAddHereComponent from "@/components/CardAddHereComponent.vue";

const {playlist} = defineProps(["playlist"])
const playlistStore = usePlaylistStore()

onBeforeMount(() => {
  playlistStore.initPlaylist(playlist).then((response) => {
    if (response.length > 0) {
      playlistStore.getNextSong()
      setInitialSong()
    } else {
      console.log("no songs on this playlist")
    }
  })
})

const getAndStartNextSong = () => {
  playlistStore.getNextSong()
  if (playlistStore.playerReady) {
    playlistStore.player.loadUri(playlistStore.currentSong?.spotifyURI)
    playlistStore.player.play()
  }
}

const setInitialSong = () => {
  if (playlistStore.currentSong) {
    playlistStore.addPlayedSong(playlistStore.currentSong, 0)
  }
  getAndStartNextSong()
}

const selectTimelineForSong = (index: number) => {
  playlistStore.player.pause()
  const response = playlistStore.currentSong ? playlistStore.addPlayedSong(playlistStore.currentSong, index + 1) : false

  if (response) {
    console.log('parabéns')
  } else {
    console.log('oops')
  }

  getAndStartNextSong()
}

</script>

<template>
  <main>
    <section v-if="playlistStore.playlist.length === 0">
      No songs to play
    </section>
    <section class="game-board" v-if="playlistStore.playlist.length > 0">

      <section v-if="playlistStore.currentSong" class="player-section">
        <PlayerComponent :song="playlistStore.currentSong">
        </PlayerComponent>
      </section>

      <section class="timeline-section">
        <div class="cards-in-timeline">
          <CardAddHereComponent @selectTimelineForSong="selectTimelineForSong(-1)">
          </CardAddHereComponent>
          <div v-for="(song, index) in playlistStore.playedSongs"
               class="cards-in-timeline-repeat">
            <CardComponent
              :song="song"
              ref="cards"
            ></CardComponent>
            <div class="add-here-button">
              <CardAddHereComponent @selectTimelineForSong="selectTimelineForSong(index)">
              </CardAddHereComponent>
            </div>
          </div>
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
  width: 100%;
  gap: 2rem;
}

.player-section, .timeline-section {
  width: 100%;
}

.cards-in-timeline {
  background-color: var(--cards-background-color);
  padding: 2rem;
  border-radius: 1rem;
}

.cards-in-timeline,
.cards-in-timeline-repeat {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

@media(max-width: 40rem) {

  .cards-in-timeline,
  .cards-in-timeline-repeat {
    display: flex;
    flex-direction: column;
  }
}

</style>
