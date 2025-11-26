<script setup lang="ts">
import { usePlaylistStore } from '@/stores/playlist'
import { onBeforeMount, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Playlist } from '@/models/playlist.ts'
import PlaylistListOfCardsComponent from '@/components/icons/PlaylistListOfCardsComponent.vue'
import LoadingComponent from '@/components/modules/LoadingComponent.vue'
import SearchInputComponent from '@/components/atoms/SearchInputComponent.vue'

const router = useRouter()

const playlistStore = usePlaylistStore()

onBeforeMount(async () => {
  await playlistStore.setUserPlaylists()
})

const goToPlaylist = (playlist: Playlist) => {
  router.push('/play?playlist=' + playlist.id)
}

const searchForPlaylist = async (q: string): Promise<void> => {
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
  <main>
    <section v-if="playlistStore.loading">
      <LoadingComponent></LoadingComponent>
    </section>
    <section v-else class="game-board">
      <SearchInputComponent @search="searchForPlaylist" placeholder="Procurar por playlist..." />

      <PlaylistListOfCardsComponent
        :searchPlaylistList="playlistStore.usersPlaylists"
        :playlist-list="playlistStore.searchResults"
        @goToPlaylist="goToPlaylist"
      />
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
