<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
import { usePlaylistStore } from '@/stores/playlist'
import { onBeforeMount } from 'vue'
import PlayerComponent from '@/components/PlayerComponent.vue'
import CardAddHereComponent from '@/components/CardAddHereComponent.vue'
import { Spin } from 'ant-design-vue'

const { playlist } = defineProps(['playlist'])
const playlistStore = usePlaylistStore()

onBeforeMount(() => {
  playlistStore.initPlaylist(playlist).then((response) => {
    if (response.length > 0) {
      playlistStore.getNextSong()
      setInitialSong()
    } else {
      console.log('no songs on this playlist')
    }
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
  if (playlistStore.currentSong) {
    playlistStore.addPlayedSong(playlistStore.currentSong, 0)
  }
  getAndStartNextSong()
}

const getIDForSongCard = (songName) => {
  return 'cards-song-' + songName.replaceAll(' ', '-').replaceAll('(', '-').replaceAll(')', '-')
}

const selectTimelineForSong = (index: number) => {
  playlistStore.player.pause()
  let response: boolean
  if (playlistStore.currentSong) {
    response = playlistStore.addPlayedSong(playlistStore.currentSong, index + 1)
  }

  const elementId = getIDForSongCard(playlistStore?.currentSong?.name)

  if (response) {
    setTimeout(() => {
      document.getElementById(elementId)?.classList.add('correct-item')
    }, 100)
  } else {
    setTimeout(() => {
      document.getElementById(elementId)?.classList.add('remove-item')
    }, 100)
  }

  getAndStartNextSong()
}

</script>

<template>
  <main>
    <div v-if="playlistStore.loading">
      <Spin></Spin>
    </div>
    <div v-if="!playlistStore.loading && playlistStore.playlist.length === 0">
      No songs to play
    </div>
    <div class="game-board"
         v-if="!playlistStore.loading && playlistStore.playlist.length > 0">
      <div v-if="playlistStore.playlistSongsLeft.length === 0">
        <h3>Parabéns!! Você acertou {{ playlistStore.playedSongs.length }} músicas</h3>
      </div>
      <div v-if="playlistStore.playlistSongsLeft.length > 0">
        <h3>Escute a música e coloque no lugar certo na linha do tempo abaixo</h3>
      </div>

      <div v-if="playlistStore.currentSong" class="player-section">
        <PlayerComponent :song="playlistStore.currentSong"
                         :amountOfSongs="playlistStore.playlist.length"
                         :amountOfSongsLeft="playlistStore.playlistSongsLeft.length">
        </PlayerComponent>
      </div>

      <div class="timeline-section">
        <div class="cards-in-timeline">
          <CardAddHereComponent @selectTimelineForSong="selectTimelineForSong(-1)">
          </CardAddHereComponent>
          <div v-for="(song, index) in playlistStore.playedSongs"
               class="cards-in-timeline-repeat"
               :key="song.spotifyURI">
            <CardComponent
              :song="song"
              ref="cards"
              :id="getIDForSongCard(song.name)"
            ></CardComponent>
            <CardAddHereComponent @selectTimelineForSong="selectTimelineForSong(index)">
            </CardAddHereComponent>
          </div>
        </div>
      </div>
    </div>
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
  width: 100%;
  gap: 2rem;
}

.cards-in-timeline {
  width: 100%;
  overflow-x: scroll;
}

.player-section,
.timeline-section,
.cards-in-timeline,
.cards-in-timeline-repeat {
  width: 100%;
}

@media (min-width: 40rem) {
  .cards-in-timeline-repeat {
    justify-content: flex-start !important;
  }
}

.cards-in-timeline {
  background-color: var(--cards-background-color);
  padding: 2rem;
  border-radius: 1rem;
}

.cards-in-timeline,
.cards-in-timeline-repeat {
  display: flex;
  gap: 1rem;
  align-items: center;
}

@media (max-width: 40rem) {
  .cards-in-timeline,
  .cards-in-timeline-repeat {
    display: flex;
    flex-direction: column;
  }
}

.remove-item {
  animation: zoomInOut 900ms forwards;
}

@keyframes zoomInOut {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0.1);
  }
}

.correct-item {
  animation: zoomIn 1s forwards;
}

@keyframes zoomIn {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

</style>
