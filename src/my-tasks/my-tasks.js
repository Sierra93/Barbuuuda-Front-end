/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import NavMenu from '../components/nav-menu.vue';
import MyTasks from '../components/my-tasks.vue';
import $ from "jquery";
import VueRouter from 'vue-router';
import axios from 'axios';

export default {
    name: 'my-tasks',
    components: {
        NavMenu,
        VueRouter,
        MyTasks
    },
    created() {
        this._loadingTaskList();
    },
    data() {
        return {
            aTasks: []
         }
    },    
    props: ["oData", "oEditTask"],
    methods: {
        // Функция получает список заданий заказчика.
        _loadingTaskList() {
            let userId = +localStorage["userId"];
            let sTypeAll = this.oEditTask.sTypes.All;   // Все задания.
            const sUrl = this.oData.urlApi.concat("/task/tasks-list?userId=".concat(userId).concat("&type=".concat(sTypeAll)));

            try {
                axios.post(sUrl)
                    .then((response) => {         
                        this.aTasks = response.data;               
                        console.log("Список заданий", this.aTasks);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка получения списка заданий', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция получает выделенное задание.
        onGetTask(taskId) {
            let userId = +localStorage["userId"];
            let sTypeSingle = this.oEditTask.sTypes.Single;   // Задание для изменения или просмотра.
            const sUrl = this.oData.urlApi
            .concat("/task/tasks-list?userId="
            .concat(userId)
            .concat("&taskId=")
            .concat(taskId)
            .concat("&type="
            .concat(sTypeSingle)));

            try {
                axios.post(sUrl)
                    .then((response) => {         
                        this.oEditTask.editTask = response.data;               
                        console.log("editTask", this.oEditTask.editTask);
                        this.$router.push("/task/view/".concat(this.oEditTask.editTask[0].taskId));
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка получения задания', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        }
    }
}