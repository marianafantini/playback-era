<script setup lang="ts">

</script>

<template>
  <div class="trophy-div">
    <img src="/public/trophy.svg" />
  </div>
</template>

<style scoped>

.trophy-div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  margin-top: 1rem;
  border-radius: 1rem;
  background: linear-gradient(to bottom right, #facc15, #f97316, #ca8a04);
  box-shadow: var(0 0 #0000, 0 0 #0000), var(0 0 #0000, 0 0 #0000), 0 25px 50px -12px var(rgb(234 179 8/0.5));
  animation: bounce 1s infinite;
}

.trophy-div img {
  height: 5rem;
}


@keyframes bounce {
  0% {
    margin-top: 1rem;
    margin-bottom: 0;
  }
  50% {
    margin-top: 0rem;
    margin-bottom: 1rem;
  }
  100% {
    margin-top: 1rem;
    margin-bottom: 0;
  }
}

</style>
