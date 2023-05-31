import TimePickerField from "../components/TimePickerField.vue";

export default {
    install: (app, options) => {
        app.component('Vue3TimePicker', TimePickerField)
    },
};
