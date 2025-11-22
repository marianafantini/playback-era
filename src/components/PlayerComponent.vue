<script setup lang="ts">
import PlayerControlsComponent from '@/components/PlayerControlsComponent.vue'
import { usePlaylistStore } from '@/stores/playlist.ts'

const playlistStore = usePlaylistStore()
const { song } = defineProps(['song'])

const configurePlayer = () => {
  const tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  const firstScriptTag = document.getElementsByTagName('script')[0]
  if (firstScriptTag) {
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag)
  }

  (window as any).onYouTubePlayerAPIReady = () => {
    playlistStore.player = new YT.Player('music-player', {
      videoId: song.youtubeVideoID,
      origin: 'http://localhost:5173/play',
      events: {
        'onReady': (event) => {
          playlistStore.ready = true
          event?.target?.playVideo()
        }
      }
    })
  }
}

configurePlayer()

const playSong = () => {
  playlistStore.player.playVideo()
}

const pauseSong = () => {
  playlistStore.player.pauseVideo()
}

</script>

<template>

  <PlayerControlsComponent :hidden="true"
                           :song="song"
                           @playSong="playSong"
                           @pauseSong="pauseSong">
  </PlayerControlsComponent>


  <div class="hidden">
    <div id="music-player"></div>
  </div>

</template>

<style scoped>

.hidden {
  display: none;
}

</style>
