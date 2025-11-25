<script setup lang="ts">
const emit = defineEmits(['onChange'])
const { options, checked } = defineProps(['options', 'checked'])

const changeValue = (newValue) => {
  emit('onChange', newValue)
  const radioButtons = [...document.getElementsByClassName('radio-div')]
  radioButtons.forEach((item) => item.classList.remove('checked'))
  document.getElementById('radio-button-' + newValue)?.classList.add('checked')
}

</script>

<template>
  <div class="radio-buttons">
    <div v-for="option in options"
         @click="changeValue(option)"
         :class="'radio-div ' + (checked == option ? 'checked' : '')"
         :id="'radio-button-'+option">
      <input type="radio" :id="option" name="amount-of-rounds" :value="option" />
      <label :for="option">{{ option }}</label>
    </div>
  </div>
</template>

<style scoped>

.radio-buttons * {
  cursor: pointer;
}

.radio-buttons {
  display: flex;
  color: var(--color);
  background-color: #55607e;
  border-radius: 0.5rem;
}

.radio-buttons div {
  padding: 0.5rem 1rem;
  border: 1px solid #243154;
}

.radio-buttons div:first-child {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

.radio-buttons div:last-child {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.radio-buttons input {
  margin-right: 0.5rem;
  display: none;
}

.radio-buttons .checked {
  background-color: #30457c;
}

</style>
