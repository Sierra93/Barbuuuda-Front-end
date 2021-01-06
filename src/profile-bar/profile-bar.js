/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import ProfileBar from '../components/profile-bar.vue';
import $ from "jquery";
import VueRouter from 'vue-router';
import axios from 'axios';
import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';

export default {
    name: 'profile-bar',
    components: {
        VueRouter,
        ProfileBar,
        Calendar,
        DatePicker
    },
    created() {},
    data() {
        return {
            picker: new Date()
        }
    },
    props: ['oData'],
    methods: {}
}