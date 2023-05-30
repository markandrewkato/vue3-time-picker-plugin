import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import timepicker from "../lib/timepicker.js";

createApp(App).use(timepicker).mount('#app')
