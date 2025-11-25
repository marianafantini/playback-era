<script setup lang="ts">

import { SmileOutlined } from '@ant-design/icons-vue'
import PlayerComponent from '@/components/PlayerComponent.vue'

const {
  playedSongs,
  isGameStillActive,
  song,
  amountOfSongs,
  amountOfSongsLeft
} = defineProps([
  'playedSongs',
  'isGameStillActive',
  'song',
  'amountOfSongs',
  'amountOfSongsLeft'
])

</script>

<template>
  <div v-if="isGameStillActive">
    <h3>Ouça e descubra o ano!</h3>
    <PlayerComponent
      :song="song"
      :amountOfSongs="amountOfSongs"
      :amountOfSongsLeft="amountOfSongsLeft"
    >
    </PlayerComponent>
  </div>

  <div v-else>
    <h3>
      <SmileOutlined />
      Parabéns!! Você acertou {{ playedSongs.length }}
      {{ playedSongs.length > 1 ? 'músicas' : 'música' }}
    </h3>
  </div>
</template>

<style scoped>
h3 {
  text-align: center;
  margin-bottom: 1rem;
}

h3 span {
  margin-right: 0.5rem;
}
</style>
