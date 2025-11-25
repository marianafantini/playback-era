<script setup lang="ts">
import {usePlaylistStore} from '@/stores/playlist'
import {Input} from "ant-design-vue"

const {Search} = Input;
import {onBeforeMount} from 'vue'
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

const searchForPlaylist = async (q: string): Playlist[] => {
  await playlistStore.searchForPlaylist(q)
}

</script>

<template>
  <main>
    <section class="game-board">

      <Search placeholder="Search for playlist"
              @search="searchForPlaylist"
              class="search-playlists-input"/>

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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
}

.playlist-list div {
  width: 100%;
}

@media (min-width: 30rem) {
  .search-playlists-input {
    max-width: 40%;
  }

  .playlist-list div {
    width: auto;
    max-width: var(--card-width);
  }
}

</style>
