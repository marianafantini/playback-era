<script setup lang="ts">
import { usePlaylistStore } from '@/stores/playlist.ts'
import { onBeforeMount } from 'vue'
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons-vue'
import MusicBarsComponent from '@/components/MusicBarsComponent.vue'
import RoundDescriptionComponent from '@/components/RoundDescriptionComponent.vue'

const playlistStore = usePlaylistStore()
const { song, amountOfSongs, amountOfSongsLeft, round, totalRounds } = defineProps([
  'song',
  'amountOfSongs',
  'amountOfSongsLeft',
  'round',
  'totalRounds'
])
let isPlaying = false

onBeforeMount(() => {
  configurePlayer()
})

interface CustomEvent {
  data: {
    isPaused: boolean
  }
}

const configurePlayer = () => {
  ;(window as any).onSpotifyIframeApiReady = (IFrameAPI: any) => {
    const element = document.getElementById('embed-iframe')
    const options = {
      uri: song.spotifyURI
    }
    const callback = (EmbedController: any) => {
      EmbedController.addListener('playback_update', (event: CustomEvent) => {
        if (event.data.isPaused) {
          isPlaying = false
          console.log('pause')
        } else {
          isPlaying = true
          console.log('play')
        }
      })

      playlistStore.player = EmbedController
      playlistStore.playerReady = true
    }
    IFrameAPI.createController(element, options, callback)
  }
}

const playSong = () => {
  playlistStore.player.play()
  playlistStore.playing = true
}

const pauseSong = () => {
  playlistStore.player.pause()
  playlistStore.playing = false
}
</script>

<template>
  <div class="player-card-component-wrapper">
    <RoundDescriptionComponent
      :round="playlistStore.playlist.length - playlistStore.playlistSongsLeft.length - 1"
      :total-rounds="playlistStore.playlist.length - 1">
    </RoundDescriptionComponent>

    <h3>Em que ano essa música foi lançada?</h3>
    <div class="player-card-component">
      <div class="player-commands">
        <PlayCircleOutlined v-if="!playlistStore.playing" class="control-icons" @click="playSong" />
        <PauseCircleOutlined v-if="playlistStore.playing" class="control-icons"
                             @click="pauseSong" />
      </div>

      <div class="play-and-pause-icon">
        <MusicBarsComponent :animated="playlistStore.playing" />
      </div>
    </div>

    <div class="hidden">
      <div id="embed-iframe"></div>
    </div>
  </div>
</template>

<style scoped>

.player-card-component-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.player-card-component-wrapper h3 {
  font-size: 1.2rem;
}

.play-and-pause-icon {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: var(--subtitle-color)
}

.player-card-component {
  width: 100%;
  min-width: var(--card-width);
  border: none;
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
}

.player-commands {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  border-radius: 0.5rem;
}

.control-icons {
  font-size: 3rem;
  cursor: pointer;
  color: var(--subtitle-color);
}

.hidden {
  visibility: hidden;
  height: 0;
  width: 0;
}
</style>

