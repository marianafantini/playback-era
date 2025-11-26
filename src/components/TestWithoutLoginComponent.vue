<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

</script>

<template>
  <div>
    <button class="see-more-button" @click="router.push('/free-test?playlist=008G1BbvK1NQvbAV8MHvDz')">
      Testar sem login
    </button>
  </div>
</template>

<style>

.see-more-button {
  border-radius: 3rem;
  font-size: 1.2rem;
  font-weight: 500;
  width: 100%;
  background-color: var(--home-cards-background-color);
  color: var(--subtitle-color);
  border: 1px solid var(--home-cards-border-color);
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.see-more-button:hover {
  transform: scale(1.1);
}

</style>
