<script setup lang="ts">

</script>

<template>
  <div class="music-waves-animation">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style scoped>
.music-waves-animation {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Center the bars vertically */
  width: 10rem; /* Adjust width as needed */
  height: 2rem; /* Adjust height as needed */
}

.music-waves-animation span {
  width: 0.3rem; /* Width of each bar */
  height: 100%; /* Initial height of bars */
  background-color: var(--subtitle-color); /* Spotify green color */
  animation: musicWavesFlow 1.8s infinite ease-in-out;
  display: inline-block;
}

/* Delay the animation for each subsequent bar to create the "flow" effect */
.music-waves-animation span:nth-child(2) {
  animation-delay: -0.4s;
}

.music-waves-animation span:nth-child(3) {
  animation-delay: -0.8s;
}

.music-waves-animation span:nth-child(4) {
  animation-delay: -1.2s;
}

.music-waves-animation span:nth-child(5) {
  animation-delay: -1.6s;
}

.music-waves-animation span:nth-child(6) {
  animation-delay: -2s;
}

.music-waves-animation span:nth-child(7) {
  animation-delay: -2.4s;
}

.music-waves-animation span:nth-child(8) {
  animation-delay: -2.8s;
}

.music-waves-animation span:nth-child(9) {
  animation-delay: -3.2s;
}

/* The Keyframe animation for scaling */
@keyframes musicWavesFlow {
  0%, 100% {
    transform: scaleY(0.5); /* Start and end at half height */
  }
  50% {
    transform: scaleY(1.5); /* Scale up to 1.5x height in the middle */
  }
}

</style>
