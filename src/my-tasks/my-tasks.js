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
        this._totalPageetPagination();
    },
    data() {
        return {
            sSearch: null
         }
    },    
    props: ["oData", "oEditTask"],
    methods: {
        // Функция получает список заданий заказчика.
        _loadingTaskList() {
            let userId = localStorage["userId"];
            let sTypeAll = this.oEditTask.sTypes.All;   // Все задания.
            const sUrl = this.oData.urlApi.concat("/task/tasks-list?userId=".concat(userId).concat("&type=".concat(sTypeAll)));

            try {
                axios.post(sUrl)
                    .then((response) => {         
                        this.oData.aTasks = response.data;               
                        console.log("Список заданий", this.oData.aTasks);
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
            let userId = localStorage["userId"];
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
        },

        // Функция фильтрует список заданий заказчика.
        onFilterTasks(param) {
            if (!param) {
                this._loadingTaskList();
                window.history.pushState({ path: oldUrl }, '', oldUrl);
                return;
            }

            const sUrl = this.oData.urlApi.concat("/task/filter?query=".concat(param));
            let newUrl;
            let oldUrl = ("/tasks/my");
            window.history.pushState({ path: oldUrl }, '', oldUrl);

            try {
                axios.get(sUrl)
                    .then((response) => {         
                        console.log("filter data", response.data);
                        this.oData.aTasks = response.data;
                        newUrl = window.location.href + "/filter=" + param;
                        window.history.pushState({ path: newUrl }, '', newUrl);
                    })

                    .catch((XMLHttpRequest) => {
                        window.history.pushState({ path: oldUrl }, '', oldUrl);
                        throw new Error('Ошибка фильтрации', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция ищет задания в соответствии с поисковым параметром.
        onSearchTask(param) {
            const sUrl = this.oData.urlApi.concat("/task/search?param=".concat(param));
            let newUrl;
            let oldUrl = ("/tasks/my");
            window.history.pushState({ path: oldUrl }, '', oldUrl);            

            try {
                axios.get(sUrl)
                    .then((response) => {         
                        console.log("filter data", response.data);
                        this.oData.aTasks = response.data;

                        if (+param === NaN) {
                            newUrl = window.location.href + "/search=" + param;
                            window.history.pushState({ path: newUrl }, '', newUrl);
                        }
            
                        else {
                            newUrl = window.location.href + "/id=" + param;
                            window.history.pushState({ path: newUrl }, '', newUrl);
                        }                        
                    })

                    .catch((XMLHttpRequest) => {
                        window.history.pushState({ path: oldUrl }, '', oldUrl);
                        throw new Error('Ошибка фильтрации', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция получает общее кол-во страниц.
        _totalPageetPagination() {
            let param = 1;
            let userId = localStorage["userId"];
            const sUrl = this.oData.urlApi
            .concat("/pagination/page?userId="
            .concat(userId).concat("&pageIdx=")
            .concat(+param));

            try {
                axios.get(sUrl)
                    .then((response) => {         
                        console.log("total page pagination", response.data);
                        this.oData.countTotalPage = response.data.pageData.totalPages;
                        this.oData.aTasks = response.data.tasks
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error(XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция пагинации.
        onGetPagination(param) {
            let userId = localStorage["userId"];
            const sUrl = this.oData.urlApi
            .concat("/pagination/page?userId="
            .concat(userId).concat("&pageIdx=")
            .concat(+param));

            try {
                axios.get(sUrl)
                    .then((response) => {         
                        console.log("filter pagination", response.data);
                        this.oData.aTasks = response.data.tasks;
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error(XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        }
    }
}