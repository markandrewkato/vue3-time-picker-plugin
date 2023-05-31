<script setup>
import { computed, defineEmits, defineProps, onMounted, onUnmounted, ref } from "vue"

let handleOutsideClick

const props = defineProps(['modelValue', 'classes', 'popupClasses'])
const emit = defineEmits(['update:modelValue'])

let initialLoad = ref(true)
let showField = ref(false)
let timepickerField = ref(null)
let timepickerOptions = ref(null)

let selectedHour = ref('01')
let selectedMinute = ref('00')
let selectedMeridian = ref('AM')

let generatedTime = computed({
  get() {
    let generated = `${selectedHour.value}:${selectedMinute.value} ${selectedMeridian.value}`
    if (initialLoad.value) {
      initialLoad.value = false
      let time = parseTime(props.modelValue)
      if (time) {
        generated = props.modelValue
      } else {
        return ''
      }
    }

    emit('update:modelValue', generated)

    return generated
  }, set(value) {
    let time = parseTime(value)

    if (!time) {
      return
    }

    selectedHour.value = time[1].toString().padStart(2, "0")
    selectedMinute.value = time[2].toString().padStart(2, "0")
    selectedMeridian.value = time[3].toString().toUpperCase()

    let generated = `${selectedHour.value}:${selectedMinute.value} ${selectedMeridian.value}`

    emit('update:modelValue', generated)
  }
})

onMounted(() => {
  generatedTime.value = props.modelValue

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
           type="text"
           :value="generatedTime">
    <div ref="timepickerOptions" class="vue3-time-picker" :class="popupClasses" v-show="showField">
      <select class="vue3-time-picker__select" v-model="selectedHour">
        <option :value="hour.toString().padStart(2, '0')" v-for="hour in 12">{{
            hour.toString().padStart(2, "0")
          }}
        </option>
      </select>
      :
      <select class="vue3-time-picker__select" v-model="selectedMinute">
        <option :value="(minute - 1).toString().padStart(2, '0')" v-for="minute in 60">
          {{ (minute - 1).toString().padStart(2, "0") }}
        </option>
      </select>
      <select class="vue3-time-picker__select"
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
