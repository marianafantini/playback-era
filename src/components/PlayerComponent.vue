<script setup lang="ts">
import PlayerControlsComponent from '@/components/PlayerControlsComponent.vue'

const { song } = defineProps(['song'])
let player

const configurePlayer = () => {
  const tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  const firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

  window.onYouTubePlayerAPIReady = () => {
    console.log('youtube api ready')

    player = new YT.Player('music-player', {
      height: 0,
      width: 0,
      videoId: '18nFH23iXJw',
      autoplay: 1,
      origin: 'http://localhost:5173/play',
      events: {
        'onReady': (event) => {
          event.target.playVideo()
        }
      }
    })

    document.getElementById('music-player')?.classList.add('hidden')
  }
}

configurePlayer();

const playSong = () => {
  player.playVideo()
}

const pauseSong = () => {
  player.pauseVideo()
}

</script>

<template>

  <PlayerControlsComponent :hidden="true"
                           :song="song"
                           @playSong="playSong"
                           @pauseSong="pauseSong">
  </PlayerControlsComponent>

</template>

<style scoped>

</style>
