<script setup lang="ts">
import {usePlaylistStore} from '@/stores/playlist'
import {Input, Button} from "ant-design-vue"

const {Search} = Input;
import {onBeforeMount, onUnmounted} from 'vue'
import PlaylistCardComponent from "@/components/PlaylistCardComponent.vue";
import {useRouter} from "vue-router";
import type {Playlist} from "@/models/playlist.ts";

const router = useRouter();

const playlistStore = usePlaylistStore()

onBeforeMount(async () => {
  await playlistStore.getUserPlaylists()
})

const goToPlaylist = (playlist: Playlist) => {
  router.push("/play?playlist=" + playlist.id)
}

const searchForPlaylist = async (q: string): Promise<void> => {
  let searchResults: Playlist[] = []
  if (q.length > 0) {
    searchResults = await playlistStore.searchForPlaylist(q)
  }
  playlistStore.searchResults = searchResults;
}

onUnmounted(() => {
  playlistStore.cleanSearchResults()
})

</script>

<template>
  <main>
    <section class="game-board">

      <div class="search-playlists-area">

        <Search placeholder="Procurar playlist do spotify"
                @search="searchForPlaylist"
                @onChange="searchForPlaylist"
                :allowClear="true"
                class="search-playlists-input"/>
      </div>

      <div class="playlist-list">

        <div v-for="playlist in playlistStore.searchResults"
             @click="goToPlaylist(playlist)">
          <PlaylistCardComponent :playlist="playlist"></PlaylistCardComponent>
        </div>
        <div v-for="playlist in playlistStore.usersPlaylists"
             @click="goToPlaylist(playlist)">
          <PlaylistCardComponent :playlist="playlist"></PlaylistCardComponent>
        </div>
      </div>

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

.playlist-list {
  gap: 1rem;
  display: flex;
  flex-wrap: wrap;
}

.playlist-list div {
  width: 100%;
  justify-content: flex-start;
}


@media (min-width: 40rem) {
  .search-playlists-input {
    max-width: 40%;
  }

  .playlist-list div {
    flex-grow: inherit;
    width: auto;
  }
}

</style>
