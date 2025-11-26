<script setup lang="ts">
const { steps } = defineProps(['steps'])
</script>

<template>

  <div class="card-how-to-play">
    <h3>Como jogar</h3>
    <div class="how-to-play-list-wrapper">
      <div class="how-to-play-list-item" v-for="(item, index) in steps">
        <div class="floating-number">{{ index + 1 }}</div>
        <div class="how-to-play-step">
          <div class="icon">
            <img :src="item.icon" />
          </div>
          <div>
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.card-how-to-play {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.card-how-to-play h3 {
  text-transform: uppercase;
  padding: 0 0.3rem;
  font-weight: 500;
  color: #d8b4fe;
}

.card-how-to-play .how-to-play-list-wrapper {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-left: 0;
  margin-right: 0;
  width: 100%;
}

.card-how-to-play .how-to-play-step {
  border-radius: 1rem;
  padding: 1rem;
  background-color: var(--home-cards-background-color);
  border: 1px solid var(--home-cards-border-color);
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.card-how-to-play .floating-number {
  background-color: white;
  color: black;
  font-weight: 600;
  font-size: 0.8rem;
  border-radius: 100%;
  height: 1.2rem;
  width: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -1rem;
}

.card-how-to-play .how-to-play-step div:last-child {
  width: 70%;
}

.card-how-to-play .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  border-radius: 0.75rem;
}

.card-how-to-play .how-to-play-list-item:nth-of-type(1) .icon {
  background: linear-gradient(to bottom right, #4ade80, #10b981)
}

.card-how-to-play .how-to-play-list-item:nth-of-type(2) .icon {
  background-image: linear-gradient(to bottom right, #f472b6, #f43f5e);
}

.card-how-to-play .how-to-play-list-item:nth-of-type(3) .icon {
  background-image: linear-gradient(to bottom right, #c084fc, #6366f1);
}

.card-how-to-play .how-to-play-step img {
  height: 1.5rem;
}

.card-how-to-play .how-to-play-step h4 {
  font-weight: 500;
  font-size: 1.3rem;
}

.card-how-to-play .how-to-play-step p {
  color: #cbd5e1;
}
</style>
