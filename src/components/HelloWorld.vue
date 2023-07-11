<script setup>
import { ref } from 'vue'

let time = ref('8AM')
</script>

<template>
  <h1>{{ time }}</h1>

  <Vue3TimePicker v-model="time" classes="narrow" :disable-minutes="true" :remove-hour-padding="true" />
</template>

<style>
.narrow {
  width: 80px;
}
</style>
