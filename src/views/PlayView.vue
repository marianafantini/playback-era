<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
import { usePlaylistStore } from '@/stores/playlist'
import { onBeforeMount } from 'vue'
import PlayerComponent from '@/components/PlayerComponent.vue'
import CardAddHereComponent from '@/components/CardAddHereComponent.vue'
import { Spin } from 'ant-design-vue'
import { SmileOutlined } from '@ant-design/icons-vue'

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

const getIDForSongCard = (songName: string) => {
  return 'cards-song-' + songName.replaceAll(' ', '-').replaceAll('(', '-').replaceAll(')', '-')
}

const selectTimelineForSong = (index: number) => {
  playlistStore.player.pause()
  if (playlistStore.currentSong && playlistStore?.currentSong?.name) {
    false
    const elementId = getIDForSongCard(playlistStore?.currentSong?.name)
    const response = playlistStore.addPlayedSong(playlistStore.currentSong, index + 1)

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
    <div class="game-board">
      <div class="player-section">
        <div class="player-page-title">
          <p>Rodada {{ playlistStore.playlist.length - playlistStore.playlistSongsLeft.length - 1 }}
            de
            {{ playlistStore.playlist.length - 1 }}</p>
          <div v-if="playlistStore.playlistSongsLeft.length > 0">
            <h3>Ouça e descubra o ano!</h3>
          </div>
          <div v-if="playlistStore.playlistSongsLeft.length === 0">
            <h3>
              <SmileOutlined />
              Parabéns!! Você acertou {{ playlistStore.playedSongs.length }}
              {{ playlistStore.playedSongs.length > 1 ? 'músicas' : 'música' }}
            </h3>
          </div>
        </div>

        <div v-if="playlistStore.currentSong" class="player-component">
          <PlayerComponent :song="playlistStore.currentSong"
                           :isGameStillActive="playlistStore.isGameStillActive()"
                           :amountOfSongs="playlistStore.playlist.length"
                           :amountOfSongsLeft="playlistStore.playlistSongsLeft.length">
          </PlayerComponent>
        </div>
      </div>

      <div class="timeline-section">
        <div class="cards-in-timeline">
          <CardAddHereComponent :isGameStillActive="playlistStore.isGameStillActive()"
                                @selectTimelineForSong="selectTimelineForSong(-1)">
          </CardAddHereComponent>
          <div v-for="(song, index) in playlistStore.playedSongs"
               class="cards-in-timeline-repeat"
               :key="song.spotifyURI">
            <CardComponent
              :song="song"
              ref="cards"
              :id="getIDForSongCard(song.name)"
            ></CardComponent>
            <CardAddHereComponent :isGameStillActive="playlistStore.isGameStillActive()"
                                  @selectTimelineForSong="selectTimelineForSong(index)">
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
  gap: 1rem;
}

.cards-in-timeline {
  width: 100%;
  overflow-x: scroll;
}

.player-section,
.player-component,
.timeline-section,
.cards-in-timeline,
.cards-in-timeline-repeat {
  width: 100%;
}

.player-section {
  border-radius: 1rem;
  padding: 1rem;
  background-color: var(--cards-background-color);
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

.player-page-title p {
  font-size: 0.9rem;
  color: #8b8d94;
}

.player-page-title h3 {
  text-align: center;
}

.player-page-title h3 span {
  margin-right: 0.5rem;
}

.player-page-title {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
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
