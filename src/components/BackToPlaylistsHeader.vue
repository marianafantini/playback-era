<script setup lang="ts">
import { useRouter } from "vue-router";

const { title, subtitle } = defineProps(["title", "subtitle"]);

const router = useRouter();
</script>

<template>
  <div class="back-to-home-header">
    <div @click="router.push('/select-playlist')" class="cross-icon-area">
      <img src="/clear-search.svg" />
    </div>
    <div>
      <h1 class="header-title">{{ title }}</h1>
      <p class="header-subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<style scoped>
.back-to-home-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-title {
  font-weight: 700;
  font-size: 1.5rem;
}

.header-subtitle {
  color: var(--subtitle-color);
  font-size: 1rem;
}

.cross-icon-area {
  background-color: var(--search-background-color);
  border-radius: 100%;
  height: 3.5rem;
  width: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.cross-icon-area img {
  height: 1rem;
}
</style>
