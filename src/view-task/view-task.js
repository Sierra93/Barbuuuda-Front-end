/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import NavMenu from '../components/nav-menu.vue';
import MyTasks from '../components/my-tasks.vue';
import $ from "jquery";
import VueRouter from 'vue-router';
import axios from 'axios';

export default {
    name: 'view-task',
    components: {
        NavMenu,
        VueRouter
    },
    created() {
        
    },
    data() {
        return {
            
         }
    },    
    props: ["oData", "oEditTask"],
    methods: {       
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
                        this.editTask = response.data;               
                        console.log("editTask", this.editTask);
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