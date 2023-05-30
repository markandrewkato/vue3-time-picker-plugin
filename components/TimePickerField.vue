<script setup>
import { computed, ref, defineProps, defineEmits, onMounted, onUnmounted, toRefs, resolveComponent } from "vue"

let handleOutsideClick
let excludes = ['timepickerField']
let closeHandler = 'hidePicker'

defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

onMounted(() => {

  handleOutsideClick = (e) => {
    e.stopPropagation()
    let clickedOnExcludedEl = false

    if (!clickedOnExcludedEl) {
      clickedOnExcludedEl = timepickerField.value === e.target
    }

    if (!timepickerOptions.value.contains(e.target) && !clickedOnExcludedEl) {
      hidePicker()
    }
  }

  document.addEventListener('click', handleOutsideClick)
  document.addEventListener('touchstart', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
  document.removeEventListener('touchstart', handleOutsideClick)
})

let showField = ref(false)
let timepickerField = ref(null)
let timepickerOptions = ref(null)

let isUpdated = ref(false)
let selectedHour = ref('01')
let selectedMinute = ref('00')
let selectedMeridian = ref('AM')

let generatedTime = computed(() => {
  let generated = ''
  if (isUpdated.value) {
    generated = `${selectedHour.value}:${selectedMinute.value} ${selectedMeridian.value}`
  }
  emit('update:modelValue', generated)
  return generated
})

function showPicker() {
  showField.value = true
}

function hidePicker() {
  showField.value = false
}
</script>

<template>
  <div class="vue3-time-picker-container">
    <input ref="timepickerField" @focus="showPicker" class="vue3-timepicker" type="text" :value="generatedTime">
    <div ref="timepickerOptions" class="vue3-time-picker" v-show="showField">
      <select class="vue3-time-picker__select" v-model="selectedHour" @change="isUpdated = true">
        <option :value="hour.toString().padStart(2, '0')" v-for="hour in 12">{{
            hour.toString().padStart(2, "0")
          }}
        </option>
      </select>
      :
      <select class="vue3-time-picker__select" v-model="selectedMinute" @change="isUpdated = true">
        <option :value="(minute - 1).toString().padStart(2, '0')" v-for="minute in 60">
          {{ (minute - 1).toString().padStart(2, "0") }}
        </option>
      </select>
      <select class="vue3-time-picker__select" v-model="selectedMeridian" @change="isUpdated = true">
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.vue3-time-picker-container {
  display: inline;
  position: relative;
}

.vue3-time-picker {
  position: absolute;
  height: 30px;
  bottom: -54px;
  left: 0;
  display: block;
  padding: 10px;
  background: #eee;
  border-radius: 6px;
  color: black;
}

.vue3-time-picker__select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  text-align: center;
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 6px 10px;
  background: #ffffff;
  cursor: pointer;
  font-family: 'Tahoma', sans-serif;
  color: black;
}
</style>
