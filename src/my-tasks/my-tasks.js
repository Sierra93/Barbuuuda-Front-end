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
    props: ['oData'],
    methods: {
        _loadingTaskList() {
            let userId = +localStorage["userId"];
            const sUrl = this.oData.urlApi.concat("/task/tasks-list/".concat(userId));

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
        }
    }
}