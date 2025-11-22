<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
import AddHereComponent from '@/components/AddHereComponent.vue'
import { usePlaylistStore } from '@/stores/playlist'

import { type DebuggerEventExtraInfo, onBeforeMount, onMounted } from 'vue'
import PlayerComponent from '@/components/PlayerComponent.vue'
import type { SubscriptionCallbackMutation } from 'pinia'

import type { Song } from '@/models/song.ts'

const playlistStore = usePlaylistStore()

onBeforeMount(() => {
  playlistStore.initPlaylist()
  playlistStore.getNextSong()
})

onMounted(() => {
  setInitialSong()
})

const getAndStartNextSong = () => {
  playlistStore.getNextSong()
  if (playlistStore.ready) {
    playlistStore.player.loadVideoById(playlistStore.currentSong?.youtubeVideoID)
  }
  playlistStore.$subscribe((mutation: SubscriptionCallbackMutation<{
    currentSong: Song;
    playlist: Song[];
    playedSongs: Song[];
    possibleColors: string[];
    player: any;
    ready: boolean;
  }>) => {
    if (mutation?.events?.key === 'ready' && mutation?.events?.newValue) {
      playlistStore.player.playVideo()
    }
  })
}

const setInitialSong = () => {
  const response = playlistStore.currentSong ? playlistStore.addPlayedSong(playlistStore.currentSong, 0) : false
  getAndStartNextSong()
}

const selectTimelineForSong = (index: number) => {
  playlistStore.player.stopVideo()
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
      <section>
        <!--   show current card without song info   -->
        <PlayerComponent :song="playlistStore.currentSong"
                         @playSong="playSong"
                         @pauseSong="pauseSong">
        </PlayerComponent>
      </section>

      <section>
        <!--   cards that the user has, in timeline   -->
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
