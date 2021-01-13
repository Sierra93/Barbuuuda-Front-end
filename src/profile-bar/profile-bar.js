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
            picker: new Date(),
            sDate: null,
            aCalendarTasks: []
        }
    },
    props: ["oData"],
    methods: {
        onGetDate(date) {
            let formatDate = date.toLocaleString();
            const sUrl = this.$parent.oData.urlApi.concat("/task/concretely-date?date=".concat(formatDate));

            try {
                axios.get(sUrl)
                    .then((response) => {         
                        this.$parent.oData.aTasks= response.data;               
                        console.log("Задания выбранной даты", this.$parent.oData.aTasks);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка получения заданий выбранной даты', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        }
    }
}