/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import NavMenu from '../components/nav-menu.vue';
import MyTasks from '../components/my-tasks.vue';
import $ from "jquery";
import VueRouter from 'vue-router';
import axios from 'axios';
import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';

export default {
    name: 'view-task',
    components: {
        NavMenu,
        VueRouter,
        Calendar,
        DatePicker
    },
    created() {
        console.log("start");
    },
    data() {
        return {
            picker: new Date()
         }
    },    
    props: ["oData", "oEditTask"],
    methods: {       
        
    }
}