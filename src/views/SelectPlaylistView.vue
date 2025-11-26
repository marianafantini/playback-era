<script setup lang="ts">
import { usePlaylistStore } from '@/stores/playlist'
import { Input, Button } from 'ant-design-vue'

const { Search } = Input
import { onBeforeMount, onUnmounted } from 'vue'
import PlaylistCardComponent from '@/components/PlaylistCardComponent.vue'
import { useRouter } from 'vue-router'
import type { Playlist } from '@/models/playlist.ts'
import PlaylistListOfCardsComponent from '@/components/icons/PlaylistListOfCardsComponent.vue'
import SearchPlaylist from '@/components/SearchPlaylist.vue'

const router = useRouter()

const playlistStore = usePlaylistStore()

onBeforeMount(async () => {
  await playlistStore.setUserPlaylists()
})

const goToPlaylist = (playlist: Playlist) => {
  router.push('/play?playlist=' + playlist.id)
}

const searchForPlaylist = async (q: string): Promise<void> => {
  console.log("search for ", q)
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
    <section class="game-board">
      <SearchPlaylist @searchForPlaylist="searchForPlaylist" />

      <PlaylistListOfCardsComponent :searchPlaylistList="playlistStore.usersPlaylists"
                                    :playlist-list="playlistStore.searchResults"
                                    @goToPlaylist="goToPlaylist" />

    </section>
  </main>
</template>

<style scoped>
.search-playlists-area {
  display: flex;
  gap: 1rem;
  width: 100%;
}

.search-playlists-input {
  border: none;
}

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

@media (min-width: 40rem) {
  .search-playlists-input {
    max-width: 40%;
  }
}
</style>
