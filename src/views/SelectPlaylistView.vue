<script setup lang="ts">
import { usePlaylistStore } from '@/stores/playlist'
import { Input, Button } from 'ant-design-vue'

const { Search } = Input
import { onBeforeMount, onUnmounted } from 'vue'
import PlaylistCardComponent from '@/components/PlaylistCardComponent.vue'
import { RouterLink, useRouter } from 'vue-router'
import type { Playlist } from '@/models/playlist.ts'
import PlaylistListOfCardsComponent from '@/components/icons/PlaylistListOfCardsComponent.vue'
import SearchPlaylist from '@/components/SearchPlaylist.vue'
import BackToHomeHeader from '@/components/BackToHomeHeader.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import MusicBarsComponent from '@/components/MusicBarsComponent.vue'

const playlistStore = usePlaylistStore()

onBeforeMount(async () => {
  await playlistStore.setUserPlaylists()
})

const goToPlaylist = (playlist: Playlist) => {
  router.push('/play?playlist=' + playlist.id)
}

const searchForPlaylist = async (q: string): Promise<void> => {
  console.log('search for ', q)
  let searchResults: Playlist[] = []
  if (q.length > 0) {
    searchResults = await playlistStore.searchForPlaylist(q)
  }
  playlistStore.searchResults = searchResults
}

onUnmounted(() => {
  playlistStore.cleanSearchResults()
})
</script>

<template>
  <header>
    <BackToHomeHeader :title="'Escolha uma playlist'"
    :subtitle="'Suas playlists do Spotify'"/>
  </header>
  <main>
    <section v-if="playlistStore.loading">
      <LoadingComponent></LoadingComponent>
    </section>
    <section v-else class="game-board">
      <SearchPlaylist @searchForPlaylist="searchForPlaylist" />

      <PlaylistListOfCardsComponent :searchPlaylistList="playlistStore.usersPlaylists"
                                    :playlist-list="playlistStore.searchResults"
                                    @goToPlaylist="goToPlaylist" />

    </section>
  </main>
</template>

<style scoped>
.game-board {
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  height: 100%;
  min-height: 70vh;
  width: 100%;
}
</style>
