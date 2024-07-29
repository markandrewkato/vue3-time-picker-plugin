# Vue 3 Time Picker Plugin

Simple, clean and easy to use time picker for Vue 3.

- Lightweight
- No dependencies
- More features coming soon

## Preview

[![demo](https://raw.githubusercontent.com/markandrewkato/vue3-time-picker-plugin/main/demo.gif)](https://github.com/markandrewkato/vue3-time-picker-plugin)

## Get Started

Install:

```
npm i vue3-time-picker-plugin
```

Then, import and register the component and css:

```
import { createApp } from "vue";
import App from "./App.vue";

import timepicker from 'vue3-time-picker-plugin';
import 'vue3-time-picker-plugin/dist/style.css';

createApp(App)
    .use(timepicker)
    .mount("#app");
```

You can now use the component like so:

```
<Vue3TimePicker v-model="time" />
```

## Documentation

### Clearing input

Press backspace or delete to clear the input

### Available Props

| Prop Name         | Type           | Default | Description                          |
|-------------------|----------------|:-------:|--------------------------------------|
| classes           | Object / Array |         | Add class to the input field         |
| popupClasses      | Object / Array |         | Add class to the option popup        |
| hourIncrements    | Number         |    1    | Increment the hour options           |        
| minuteIncrements  | Number         |    1    | Increment the minute options         |
| disableMinutes    | Boolean        |  false  | Remove minutes value (eg. 8AM)       |
| removeHourPadding | Boolean        |  false  | Remove the leading 0 from hour value |


## Donations

If it has saved you development time, you can buy me a cup of coffee. :)

<a href="https://www.buymeacoffee.com/mackth">
  <img src="https://raw.githubusercontent.com/markandrewkato/vue3-time-picker-plugin/main/bmc_qr.png" alt="Buy Me a Coffee" style="width:200px;height:auto;">
</a>

## Inspired by

https://www.youtube.com/watch?v=97lSkxy7Wjk
