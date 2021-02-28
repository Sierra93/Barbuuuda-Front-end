/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import CustomerHeader from '../components/customer-header.vue';
import CHome from '../components/home.vue';
import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import $ from "jquery";
import axios from 'axios';

export default {
    name: 'c-home',
    components: {
        CustomerHeader,
        CHome,
        Calendar,
        DatePicker
    },
    props: ['oData'],
    created() {
        this._loadingActiveTasks();
        this._loadExecutorTest();
    },
    data() {
        return {
            picker: new Date(),
            aCalendarTasks: [],
            aExecutorTests: [],
            bStartTest: false
        }
    },    
    methods: {
        // Функция получает активные задания заказчика.
        _loadingActiveTasks() {
            const sUrl = this.oData.urlApi.concat("/task/active");

            try {
                axios.get(sUrl)
                    .then((response) => {         
                        console.log("Активные задания", response.data);
                        this.oData.aTasks = response.data;
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка активных заданий', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция получает задания выбранной даты в календаре.
        onGetDate(date) {                   
            let oData = this.$parent.oData;                     
            this.utils.getTasksDate(date, oData);
            
            setTimeout(() => {
                this.$parent.oData.aTasks = window.aTasks;
            }, 100);
        },

        // Функция выгружает данные для теста исполнителей.
        _loadExecutorTest() {
            if (!sessionStorage["role"] == "E") {
                return;
            }

            const sUrl = this.oData.urlApi.concat("/executor/answer?numberQuestion=1");

            try {
                axios.get(sUrl)
                    .then((response) => {         
                        console.log("Вопросы для теста исполнителей", response.data);
                        this.aExecutorTests = response.data;
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка вопросы для теста исполнителей', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        }
    }
}