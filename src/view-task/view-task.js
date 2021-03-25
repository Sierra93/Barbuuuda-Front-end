/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import NavMenu from '../components/nav-menu.vue';
import $ from "jquery";
import VueRouter from 'vue-router';
import axios from 'axios';
import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';

$(function () {    
    __VUE_HOT_MAP__.refreshToken();
});

export default {
    name: 'view-task',
    components: {
        NavMenu,
        VueRouter,
        Calendar,
        DatePicker
    },
    data() {
        return {
            picker: new Date(),
            price: null,
            comment: ""
         }
    },    
    props: ["oData", "oEditTask"],
    methods: {       
        // Функция переходит к изменению здания.
        onEditTask() {
            this.oEditTask.editTask.bEdit = true;
            this.$router.push("/task/create");
        },

        // Функция покажет модалку об удалении задания.
        onShowDeleteModal() {
            $('#idAcceptDeleteTask').modal('show');
        },

        // Функция покажет модалку ставки к заданию.
        onShowRespondModal() {
            if (sessionStorage["role"] == "E") {
                $('#idRespond').modal('show');
                return;
            }
        },

        // Функция удаляет задание.
        OnDeleteTask() {
            let taskId = this.oEditTask.editTask[0].taskId;
            let sUrl = this.oData.urlApi.concat("/task/delete/".concat(taskId));
            
            try {
                axios.get(sUrl)
                    .then((response) => {
                        this.$router.push("/tasks/my");
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка удаления', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция оставляет ставку к заданию.
        onRespond(price, comment) {
            let sUrl = this.oData.urlApi.concat("/executor/respond/");
            let oRespond = {
                Price: price,
                Comment: comment,
                TaskId: this.oData.oViewTaskId
            };
            
            try {
                axios.post(sUrl, oRespond)
                    .then((response) => {
                        console.log("Ставка к заданию сделана");
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка оставления ставки к заданию', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        }
    }
}