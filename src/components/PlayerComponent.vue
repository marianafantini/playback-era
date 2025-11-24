<script setup lang="ts">
import { usePlaylistStore } from '@/stores/playlist.ts'
import { onBeforeMount, onMounted } from 'vue'
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons-vue'

const playlistStore = usePlaylistStore()
const {song} = defineProps(["song"])

onBeforeMount(() => {
  configurePlayer()
})

onMounted(() => {
  playSong()
})

const configurePlayer = () => {
  (window as any).onSpotifyIframeApiReady = (IFrameAPI: any) => {
    const element = document.getElementById('embed-iframe')
    const options = {
      uri: song.spotifyURI
    }
    const callback = (EmbedController: any) => {
      playlistStore.player = EmbedController
      playlistStore.playerReady = true
    }
    IFrameAPI.createController(element, options, callback)
  }
}

const playSong = () => {
  if (playlistStore.playerReady && playlistStore.player) {
    playlistStore.player.play()
  }
}

const pauseSong = () => {
  playlistStore.player.pause()
}

</script>

<template>

  <div class="music-card">
    <PlayCircleOutlined class="control-icons" @click="playSong" />
    <PauseCircleOutlined class="control-icons" @click="pauseSong" />
  </div>

  <div class="hidden">
    <div id="embed-iframe"></div>
  </div>

</template>

<style scoped>

.music-card {
  border: 0.1rem solid;
  padding: 1rem 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  min-height: var(--card-height);
  min-width: var(--card-width);
  background-color: var(--cards-background-color);
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
