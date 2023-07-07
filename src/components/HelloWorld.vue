<script setup>
import { ref } from 'vue'

let time = ref('8:00 AM')
</script>

<template>
  <h1>{{ time }}</h1>

  <Vue3TimePicker v-model="time" classes="narrow" />
</template>

<style>
.narrow {
  width: 80px;
}
</style>
