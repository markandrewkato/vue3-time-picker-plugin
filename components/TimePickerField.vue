<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue"

let handleOutsideClick

const props = defineProps(['modelValue', 'classes', 'popupClasses', 'hourIncrements', 'minuteIncrements'])
const emit = defineEmits(['update:modelValue'])

let showField = ref(false)
let timepickerField = ref(null)
let timepickerOptions = ref(null)

let selectedHour = ref('01')
let selectedMinute = ref('00')
let selectedMeridian = ref('AM')
let generatedTime = ref('')

const minuteOptions = computed(() => {
  let increments = props.minuteIncrements ?? 1;
  let minutes = []
  for (let i = 0; i < 60; i++) {
    if (i % increments === 0) {
      minutes.push(i.toString().padStart(2, '0'))
    }
  }
  return minutes
})

const hourOptions = computed(() => {
  let increments = props.hourIncrements ?? 1;
  let hours = []
  for (let i = 1; i <= 12; i++) {
    if (i % increments === 0) {
      hours.push(i.toString().padStart(2, '0'))
    }
  }
  return hours
})

watch(() => props.modelValue, (newValue) => {
  setPropsToData(newValue)
})

onMounted(() => {
  setPropsToData(props.modelValue)

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

function setPropsToData(value) {
  let time = parseTime(value)
  if (!time) {
    generatedTime.value = ''
    return
  }

  let hour = time[1].toString().padStart(2, "0");
  let minute = time[2].toString().padStart(2, "0")

  if (!hourOptions.value.includes(hour) || !minuteOptions.value.includes(minute)) {
    generatedTime.value = ''
    return
  }

  selectedHour.value = hour
  selectedMinute.value = minute
  selectedMeridian.value = time[3].toString().toUpperCase()

  generatedTime.value = value
}

function generateTime() {
  let generated = ''

  if (selectedHour.value && selectedMinute.value && selectedMeridian.value) {
    generated = `${selectedHour.value}:${selectedMinute.value} ${selectedMeridian.value}`
  }

  return generated
}

function onChangeTime() {
  generatedTime.value = generateTime()
  emit('update:modelValue', generatedTime.value)
}

function clearInput(e) {
  if (e.key === "Backspace" || e.key === "Delete") {
    generatedTime.value = ''
    emit('update:modelValue', generatedTime.value)
  }
}

function parseTime(t) {
  if (!t) return null
  return t.match(/(1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm])/);
}

function showPicker() {
  showField.value = true
}

function hidePicker() {
  showField.value = false
}

</script>

<template>
  <div class="vue3-time-picker-container">
    <input ref="timepickerField"
           :class="classes"
           @focus="showPicker"
           class="vue3-timepicker"
           :readonly="true"
           type="text"
           @keyup.prevent="clearInput"
           :value="generatedTime">
    <div ref="timepickerOptions" class="vue3-time-picker" :class="popupClasses" v-show="showField">
      <select class="vue3-time-picker__select" v-model="selectedHour" @change="onChangeTime">
        <option :value="hour" v-for="hour in hourOptions">{{ hour }}</option>
      </select>
      :
      <select class="vue3-time-picker__select" v-model="selectedMinute" @change="onChangeTime">
        <option :value="minute" v-for="minute in minuteOptions">{{ minute }}</option>
      </select>
      <select class="vue3-time-picker__select"
              @change="onChangeTime"
              v-model="selectedMeridian">
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
  z-index: 99999;
  left: 0;
  display: block;
  padding: 6px;
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
  font-family: 'Verdana', sans-serif;
  color: black;
}
</style>
