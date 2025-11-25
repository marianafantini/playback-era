<script setup lang="ts">
import { usePlaylistStore } from '@/stores/playlist.ts'
import { onBeforeMount } from 'vue'
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons-vue'

const playlistStore = usePlaylistStore()
const { song, amountOfSongs, amountOfSongsLeft } = defineProps([
  'song',
  'amountOfSongs',
  'amountOfSongsLeft'
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
}

const pauseSong = () => {
  playlistStore.player.pause()
}
</script>

<template>
  <div class="player-card-component">
    <div class="player-commands">
      <PlayCircleOutlined class="control-icons" @click="playSong" />
      <PauseCircleOutlined class="control-icons" @click="pauseSong" />
    </div>
  </div>

  <div class="hidden">
    <div id="embed-iframe"></div>
  </div>
</template>

<style scoped>
.player-card-component {
  width: 100%;
  min-width: var(--card-width);
  border: none;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.player-commands {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 3rem;
  background-color: #243154;
  padding: 3rem 1.5rem;
  border-radius: 0.5rem;
}

.control-icons {
  font-size: 3rem;
  cursor: pointer;
}

.hidden {
  visibility: hidden;
  height: 0;
  width: 0;
}
</style>
