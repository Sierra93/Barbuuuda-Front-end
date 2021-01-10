/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import CreateTask from '../components/create-task.vue';
import $ from "jquery";
import axios from 'axios';

export default {
    name: 'task-create',
    components: {
        CreateTask
    },
    created() {
        this._loadingCategories();
        // this._loadingSpecializations();

        this.oData.bGuest = localStorage["role"] == "Гость" ? true : false;
        this.oData.bCustomer = localStorage["role"] == "Заказчик" ? true : false;
        
        if (this.$route.name == "main") {
            this.oData.bCustomer = false;
            this.oData.bExecutor = false;
            this.oData.bGuest = true;
        }

        if (this.$route.name == "task/create" && this.oData.bCustomer) {
            this.oData.bGuest = false;
            this.oData.bExecutor = false;
        }

        if (this.$route.name == "task/create" && this.oData.bExecutor) {
            this.oData.bGuest = false;
            this.oData.bCustomer = false;
        }
    },
    props: ['oData'],
    data() {
        return {
            aCategories: [],
            bHideFields: false,
            checkCategory: null,
            checkSpec: null
        }
    },    
    methods: {
        // Функция делает активной область заполнения полей задания.
        onShowTask(e) {
            console.log("onShowTask");
        },

        // Функция подгружает список категорий заданий.
        _loadingCategories() {
            const sUrl = this.oData.urlApi.concat("/task/get-categories");

            try {
                axios.post(sUrl)
                    .then((response) => {
                        // Заменит null на ""
                        response.data.forEach(el => {
                            if (el.specializations == null) {
                                el.specializations = "";
                            }
                        });                           
                        
                        this.aCategories = response.data;
                        console.log("Список категорий", this.aCategories);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка получения списка категорий', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция подгружает список специализаций заданий.
        // _loadingSpecializations() {
        //     const sUrl = this.oData.urlApi.concat("/task/get-specializations");

        //     try {
        //         axios.post(sUrl)
        //             .then((response) => {
        //                 this.aSpecializations = response.data;
        //                 console.log("Список специализаций", this.aSpecializations);
        //             })

        //             .catch((XMLHttpRequest) => {
        //                 throw new Error('Ошибка получения списка специализаций', XMLHttpRequest.response.data);
        //             });
        //     } 
            
        //     catch (ex) {
        //         throw new Error(ex);
        //     }
        // },

        onBack() {
            //window.location.href = "/";     
            this.$router.push("/");
        },

        // Функция делает поля задачи доступными для ввода.
        onShowTaskFields() {
            // this.bHideFields = this.checkCategory && this.checkSpec ? true : false;
            this.bHideFields = true;
        },

        // Функция создает задание.
        onCreateTask() {
            const sUrl = this.oData.urlApi.concat("/task/create");

            try {
                axios.post(sUrl, {
                    OwnerId: +localStorage["userId"],
                    TaskTitle: $("#idTaskTitle").val(),
                    TaskDetail: $("#idTaskDetail").val(),
                    CategoryCode: this.checkCategory,
                    SpecCode: this.checkSpec
                })
                    .then((response) => {
                        console.log("Задание создано");
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка создания', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        onGetSpec(code) {
            // Функция получает выбранную специализацию.
            console.log("onGetSpec", code);
        }
    }
}