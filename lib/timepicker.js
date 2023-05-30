import TimePickerField from "../components/TimePickerField.vue";

export default {
    install: (app, options) => {
        app.component('vue3-time-picker', TimePickerField)
    },
};
