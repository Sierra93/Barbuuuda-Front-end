/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import NavMenu from '../components/nav-menu.vue';
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
        // Функция переходит к изменению здания.
        onEditTask() {
            this.oEditTask.editTask.bEdit = true;
            this.$router.push("/task/create");
        },

        // Покажет модалку об удалении задания.
        onShowDeleteModal() {
            $('#idAcceptDeleteTask').modal('show');
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
        }
    }
}