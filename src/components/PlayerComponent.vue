<script setup lang="ts">
import PlayerControlsComponent from '@/components/PlayerControlsComponent.vue'
import { usePlaylistStore } from '@/stores/playlist.ts'
import type { Song } from '@/models/song.ts'
import type { CustomEvent } from '@/models/CustomEvent.ts'

const playlistStore = usePlaylistStore()
const { song } = defineProps<{ song: Song; }>()

const configurePlayer = () => {
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe')
    const options = {
      uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'

    }
    const callback = (EmbedController) => {
      EmbedController.addListener('ready', () => {
        console.log('ready')
        EmbedController.loadUri('spotify:episode:7makk4oTQel546B0PZlDM5')
      })
    }
    IFrameAPI.createController(element, options, callback)
  }

}

configurePlayer()

const playSong = () => {
  playlistStore.player.play()
}

const pauseSong = () => {
  playlistStore.player.pause()
}


</script>

<template>

  <PlayerControlsComponent :hidden="true"
                           @playSong="playSong"
                           @pauseSong="pauseSong">
  </PlayerControlsComponent>


  <div class="hidden">
    <div id="embed-iframe"></div>
  </div>

</template>

<style scoped>

.hidden {
  visibility: hidden;
  height: 0;
  width: 0;
}

</style>
