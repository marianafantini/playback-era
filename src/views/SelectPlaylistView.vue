<script setup lang="ts">
import {usePlaylistStore} from '@/stores/playlist'

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

</script>

<template>
  <main>
    <section class="game-board">
      <div class="playlist-list">
        <div v-for="playlist in playlistStore.usersPlaylists"
             @click="goToPlaylist(playlist)">
          <PlaylistCardComponent :playlist="playlist"></PlaylistCardComponent>

        </div>
      </div>

    </section>
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
}

.playlist-list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
}

</style>
