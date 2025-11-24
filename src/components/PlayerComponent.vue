<script setup lang="ts">
import {usePlaylistStore} from '@/stores/playlist.ts'
import {onBeforeMount, onMounted, watch} from 'vue'
import {Progress} from 'ant-design-vue'
import {PauseCircleOutlined, PlayCircleOutlined} from '@ant-design/icons-vue'

const playlistStore = usePlaylistStore()
const {song} = defineProps(["song"])

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
      // const handlePlaybackUpdate = (e) => {
      //   const {position, duration, isBuffering, isPaused, playingURI} = e.data;
      //   playlistStore.songPercentage = Math.max(position / duration * 100, 5);
      //   console.log(playlistStore.songPercentage)
      //   console.log(
      //     `Playback State updates:
      //         position - ${position},
      //         duration - ${duration},
      //         isBuffering - ${isBuffering},
      //         isPaused - ${isPaused},
      //         playingURI - ${playingURI},
      //         duration - ${duration}`
      //   );
      // };
      //
      // EmbedController.addListener(
      //   "playback_update",
      //   handlePlaybackUpdate
      // );

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
    <h3>Escute a música e coloque no lugar certo na linha do tempo abaixo</h3>

    <div class="player-commands" v-if="playlistStore.playerReady">
      <PlayCircleOutlined class="control-icons" @click="playSong"/>
      <PauseCircleOutlined class="control-icons" @click="pauseSong"/>

<!--      <Progress :percent="playlistStore.songPercentage"-->
<!--                :showInfo="false"-->
<!--                size="small"-->
<!--                class="progress"-->
<!--                strokeColor="rgba(218, 222, 235, 0.85)"/>-->

    </div>
  </div>

  <div class="hidden">
    <div id="embed-iframe"></div>
  </div>

</template>

<style scoped>

.music-card {
  width: 100%;
  min-height: var(--card-height);
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
  background-color: var(--player-timeline-color);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  width: 100%;
}

.progress {
  margin-bottom: 0.2rem;
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
