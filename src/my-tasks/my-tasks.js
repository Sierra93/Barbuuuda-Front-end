/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import NavMenu from '../components/nav-menu.vue';
import MyTasks from '../components/my-tasks.vue';
import $ from "jquery";
import VueRouter from 'vue-router';
import axios from 'axios';

$(function () {    
    __VUE_HOT_MAP__.refreshToken();
});

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
        this.onGetPagination(1);
    },
    data() {
        return {
            sSearch: null,
            aActiveTasks: []
         }
    },    
    props: ["oData", "oEditTask"],
    methods: {
        // Функция получает список заданий заказчика.
        _loadingTaskList() {   
                let sTypeAll = this.oEditTask.sTypes.All; // Все задания.
                const sUrl = this.oData.urlApi.concat("/task/tasks-list?type=".concat(sTypeAll));

                try {
                    axios.post(sUrl)
                        .then((response) => {
                            this.oData.aCustomerTasks = response.data;
                            console.log("Список заданий", this.oData.aCustomerTasks);
                        })

                        .catch((XMLHttpRequest) => {
                            throw new Error('Ошибка получения списка заданий', XMLHttpRequest.response.data);
                        });
                } 
                
                catch (ex) {
                    throw new Error(ex);
                }
            

            // Если нужно выгрузить задания для исполнителя.
            // if (sessionStorage.role == "E") {
            //     sUrl = this.oData.urlApi.concat("/executor/tasks-work");

            //     try {
            //         axios.post(sUrl)
            //             .then((response) => {
            //                 this.aActiveTasks = response.data;
            //                 console.log("Список заданий в работе у исполнителя", this.aActiveTasks);
            //             })

            //             .catch((XMLHttpRequest) => {
            //                 throw new Error('Ошибка получения списка заданий в работе у исполнителя', XMLHttpRequest.response.data);
            //             });
            //     } 
                
            //     catch (ex) {
            //         throw new Error(ex);
            //     }
            // }
        },

        // Функция получает выделенное задание.
        onGetTask(taskId) {
            let sTypeSingle = this.oEditTask.sTypes.Single;   // Задание для изменения или просмотра.
            const sUrl = this.oData.urlApi
            .concat("/task/tasks-list?taskId="
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
            const sUrl = this.oData.urlApi
            .concat("/pagination/page?pageIdx="
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
            const sUrl = this.oData.urlApi
            .concat("/pagination/page?pageIdx="
            .concat(+param));

            try {
                axios.get(sUrl)
                    .then((response) => {         
                        console.log("filter pagination", response.data);
                        this.oData.aCustomerTasks = response.data.tasks;
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