/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import ProfileBar from '../components/profile-bar.vue';
import $ from "jquery";
import VueRouter from 'vue-router';
import axios from 'axios';
import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';

$(function () {  
    // TODO: Переделать на другой способ глобального хранения!   
    __VUE_HOT_MAP__.refreshToken();
});

export default {
    name: 'profile-bar',
    components: {
        VueRouter,
        ProfileBar,
        Calendar,
        DatePicker
    },
    created() {
        this._loadingCountTask();
        this._loadingetTotalCountTasks();

        // Если зашли в профиль.
        if (this.$route.name == "profile") {
            this.bHideCalendar = true;
        }
    },
    data() {
        return {
            picker: new Date(),
            sDate: null,
            aCalendarTasks: [],
            countTotal: null,
            countAuction: null,
            countWork: null,
            countGarant: null,
            countComplete: null,
            countPerechet: null,
            countDraft: null,
            countTotalTasks: null,
            bHideCalendar: false
        }
    },
    props: ["oData"],
    methods: {
        // Функция получает задания выбранной даты в календаре.
        onGetDate(date) {
            let oData = this.$parent.oData;                     
            this.utils.getTasksDate(date, oData);
            
            setTimeout(() => {
                this.$parent.oData.aTasks = window.aTasks;
            }, 100);
        },

        // Функция получает кол-во заданий в разных статусах.
        _loadingCountTask() {
            let oData = this.$parent.oData;
            let sUrl = oData.urlApi.concat("/task/count-status");

            axios.post(sUrl)
                .then((response) => {
                    this.countTotal = response.data.total;
                    this.countAuction = response.data.auction;
                    this.countWork = response.data.work;
                    this.countGarant = response.data.garant;
                    this.countComplete = response.data.complete;
                    this.countPerechet = response.data.perechet;
                    this.countDraft = response.data.draft;
                })

                .catch((XMLHttpRequest) => {
                    throw new Error(XMLHttpRequest.response.data);
                });
        },

        // Функция выгружает заданий с определенным статусом.
        onGetStatusTask(status) {
            let sUrl = this.$parent.oData.urlApi.concat("/task/task-status?status=".concat(status));

            axios.get(sUrl)
                .then((response) => {
                    this.$parent.oData.aTasks = response.data;
                })

                .catch((XMLHttpRequest) => {
                    throw new Error(XMLHttpRequest.response.data);
                });
        },

        // Функция выгружает кол-во заданий всего.
        _loadingetTotalCountTasks() {
            let sUrl = this.$parent.oData.urlApi.concat("/task/total");

            axios.get(sUrl)
                .then((response) => {
                    this.countTotalTasks = response.data;
                })

                .catch((XMLHttpRequest) => {
                    throw new Error(XMLHttpRequest.response.data);
                });
        }
    }
}