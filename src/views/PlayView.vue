<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
import AddHereComponent from '@/components/AddHereComponent.vue'
import { usePlaylistStore } from '@/stores/playlist'

import { type DebuggerEvent, type DebuggerEventExtraInfo, onBeforeMount, onMounted } from 'vue'
import PlayerComponent from '@/components/PlayerComponent.vue'
import type { SubscriptionCallbackMutation, SubscriptionCallbackMutationPatchObject } from 'pinia'

import type { Song } from '@/models/song.ts'

const playlistStore = usePlaylistStore()

onBeforeMount(() => {
  playlistStore.getSpotifyCredentials().then(() => {
    playlistStore.initPlaylist().then(() => {
      playlistStore.getNextSong()
      setInitialSong()
    })
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
  const response = playlistStore.currentSong ? playlistStore.addPlayedSong(playlistStore.currentSong, 0) : false
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
    <section class="game-board">
      <section v-if="playlistStore.currentSong">
        <PlayerComponent :song="playlistStore.currentSong">
        </PlayerComponent>
      </section>

      <section>
        <div class="cards-in-timeline">
          <AddHereComponent @selectTimelineForSong="selectTimelineForSong(-1)"></AddHereComponent>
          <div v-for="(song, index) in playlistStore.playedSongs"
               class="cards-in-timeline-repeat">
            <CardComponent
              :song="song"
              ref="cards"
            ></CardComponent>
            <div class="add-here-button">
              <AddHereComponent
                @selectTimelineForSong="selectTimelineForSong(index)"></AddHereComponent>
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
}

.cards-in-timeline,
.cards-in-timeline-repeat {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

</style>
