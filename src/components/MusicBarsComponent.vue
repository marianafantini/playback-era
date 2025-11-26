<script setup lang="ts">
const { animated } = defineProps(['animated'])
</script>

<template>
  <div :class="'music-waves-animation animated ' + (animated ? '' : 'pause-animation')">
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
  align-items: center;
  width: 10rem;
  height: 2rem;
}

.music-waves-animation span {
  width: 0.3rem;
  height: 100%;
  background-color: var(--subtitle-color);
  display: inline-block;
}

.music-waves-animation.animated span:nth-child(1) {
  animation: musicWavesFlow 1.8s infinite ease-in-out;
}

.music-waves-animation.animated span:nth-child(2) {
  animation: musicWavesFlow 1.8s infinite ease-in-out;
  animation-delay: -0.4s;
}

.music-waves-animation.animated span:nth-child(3) {
  animation: musicWavesFlow 1.8s infinite ease-in-out;
  animation-delay: -0.8s;
}

.music-waves-animation.animated span:nth-child(4) {
  animation: musicWavesFlow 1.8s infinite ease-in-out;
  animation-delay: -1.2s;
}

.music-waves-animation.animated span:nth-child(5) {
  animation: musicWavesFlow 1.8s infinite ease-in-out;
  animation-delay: -1.6s;
}

.music-waves-animation.animated span:nth-child(6) {
  animation: musicWavesFlow 1.8s infinite ease-in-out;
  animation-delay: -2s;
}

.music-waves-animation.animated span:nth-child(7) {
  animation: musicWavesFlow 1.8s infinite ease-in-out;
  animation-delay: -2.4s;
}

.music-waves-animation.animated span:nth-child(8) {
  animation: musicWavesFlow 1.8s infinite ease-in-out;
  animation-delay: -2.8s;
}

.music-waves-animation.animated span:nth-child(9) {
  animation: musicWavesFlow 1.8s infinite ease-in-out;
  animation-delay: -3.2s;
}

.music-waves-animation.animated span:nth-child(10) {
  animation: musicWavesFlow 1.8s infinite ease-in-out;
  animation-delay: -3.6s;
}

@keyframes musicWavesFlow {
  0%,
  100% {
    transform: scaleY(0.5);
  }
  50% {
    transform: scaleY(2);
  }
}

/* pause animation smoothly */
.music-waves-animation.pause-animation span:nth-child(1),
.music-waves-animation.pause-animation span:nth-child(2),
.music-waves-animation.pause-animation span:nth-child(3),
.music-waves-animation.pause-animation span:nth-child(4),
.music-waves-animation.pause-animation span:nth-child(5),
.music-waves-animation.pause-animation span:nth-child(6),
.music-waves-animation.pause-animation span:nth-child(7),
.music-waves-animation.pause-animation span:nth-child(8),
.music-waves-animation.pause-animation span:nth-child(9),
.music-waves-animation.pause-animation span:nth-child(10) {
  animation-play-state: paused;
}
</style>
