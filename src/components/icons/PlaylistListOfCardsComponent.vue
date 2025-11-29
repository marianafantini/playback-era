<script setup lang="ts">
import PlaylistCardComponent from '@/components/PlaylistCardComponent.vue';
const { searchPlaylistList, playlistList } = defineProps([
  'searchPlaylistList',
  'playlistList',
]);
defineEmits(['goToPlaylist']);

</script>

<template>
  <div class="playlist-list">
    <div
      v-for="playlist in playlistList.concat(searchPlaylistList)"
      :key="playlist.id"
      @click="$emit('goToPlaylist', playlist)"
    >
      <PlaylistCardComponent :playlist="playlist"></PlaylistCardComponent>
    </div>
  </div>
</template>

<style scoped>
.playlist-list {
  width: 100%;
  gap: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
}
</style>
