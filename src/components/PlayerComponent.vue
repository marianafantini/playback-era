<script setup lang="ts">
import {usePlaylistStore} from '@/stores/playlist.ts'
import {onBeforeMount, onMounted, watch} from 'vue'
import {Progress, Button} from 'ant-design-vue'
import {PauseCircleOutlined, PlayCircleOutlined} from '@ant-design/icons-vue'

const playlistStore = usePlaylistStore()
const {song} = defineProps(["song"])
let isPlaying = false;

onBeforeMount(() => {
  configurePlayer()
})

const configurePlayer = () => {
  (window as any).onSpotifyIframeApiReady = (IFrameAPI: any) => {
    const element = document.getElementById('embed-iframe')
    const options = {
      uri: song.spotifyURI
    }
    const callback = (EmbedController: any) => {
      EmbedController.addListener('playback_update', event => {
        if (event.data.isPaused) {
          isPlaying = false;
          console.log("pause")
        } else {
          isPlaying = true;
          console.log("play")
        }
      });

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
  <div class="music-card">
    <div class="player-commands" v-if="playlistStore.playerReady">
      <PlayCircleOutlined class="control-icons" @click="playSong"/>
      <PauseCircleOutlined class="control-icons" @click="pauseSong"/>
    </div>
  </div>

  <div class="hidden">
    <div id="embed-iframe"></div>
  </div>

</template>

<style scoped>

.music-card {
  width: 100%;
  min-width: var(--card-width);
  border: none;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background-color: var(--cards-background-color);
}

.player-commands {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  width: 100%;
}

.control-icons {
  font-size: 2rem;
  cursor: pointer;
}

.hidden {
  visibility: hidden;
  height: 0;
  width: 0;
}

</style>
