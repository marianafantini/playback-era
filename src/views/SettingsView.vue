<script setup lang="ts">
import RadioButtonButtonComponent from '@/components/atoms/RadioButtonButtonComponent.vue'
import { usePlaylistStore } from '@/stores/playlist.ts'
import { message } from 'ant-design-vue'

const playlistStore = usePlaylistStore()

const [messageApi, contextHolder] = message.useMessage()
let amountOfRounds = 10

const possibleAmountOfRounds = [6, 10, 15, 20]

const changeAmountOfRounds = (newValue: number) => {
  amountOfRounds = newValue
  playlistStore.amountOfRounds = newValue
  messageApi.destroy()
  messageApi.open({
    type: 'success',
    content: 'salvo!',
  })
}
</script>

<template>
  <main>
    <context-holder></context-holder>
    <section>
      <h1>Configurações de jogo</h1>

      <div class="config-item">
        <p>Quantidade de rodadas:</p>

        <RadioButtonButtonComponent
          :options="possibleAmountOfRounds"
          :checked="amountOfRounds"
          @onChange="changeAmountOfRounds"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
h1 {
  margin-bottom: 3rem;
}

.config-item {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
