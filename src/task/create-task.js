/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import CreateTask from '../components/create-task.vue';
import $ from "jquery";
import axios from 'axios';

export default {
    name: 'task/create',
    components: {
        CreateTask
    },
    created() {
        this._loadingCategories();
        this._loadingSpecializations();

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
            aSpecializations: []
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
        _loadingSpecializations() {
            const sUrl = this.oData.urlApi.concat("/task/get-specializations");

            try {
                axios.post(sUrl)
                    .then((response) => {
                        this.aSpecializations = response.data;
                        console.log("Список специализаций", this.aSpecializations);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка получения списка специализаций', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        onBack() {
            window.location.href = "/";
        }
    }
}