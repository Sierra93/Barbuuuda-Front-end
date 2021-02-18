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

        this.oData.bGuest = sessionStorage["role"] == "G" ? true : false;
        this.oData.bCustomer = sessionStorage["role"] == "C" ? true : false;
        this.oData.bExecutor = sessionStorage["role"] == "E" ? true : false;
        
        if (this.$route.name == "main") {
            this.oData.bCustomer = false;
            this.oData.bExecutor = false;
            this.oData.bGuest = true;
        }

        if (this.$route.name == "task-create" && this.oData.bCustomer) {
            this.oData.bGuest = false;
            this.oData.bExecutor = false;
        }

        if (this.$route.name == "task-create" && this.oData.bExecutor) {
            this.oData.bGuest = false;
            this.oData.bCustomer = false;
            this.oData.bExecutor = true;
        }

        // Подгружает данные задания, если идет редактирование.
        if (this.oEditTask.editTask.bEdit) {
            this.bEditTask = true;
            this.editTask = this.oEditTask.editTask[0];
            this.sCategoryName = this.oEditTask.editTask[0].categoryName;
            this.sSpecName = this.oEditTask.editTask[0].specName;
        }
    },
    props: ["oData", "oEditTask"],
    data() {
        return {
            aCategories: [],
            bHideFields: false,
            sSpecName: null,
            sSpecCode: null,
            sCategoryName: null,
            sCategoryCode: null,
            bEditTask: false,
            editTask: []
        }
    },    
    methods: {
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
        // onShowTaskFields() {
        //     // this.bHideFields = this.checkCategory && this.checkSpec ? true : false;
        //     this.bHideFields = true;
        // },

        // Функция создает или редактирует задание.
        onCreateTask() {
            let sUrl = "";
            let oData = {};
            let bEdit = this.oEditTask.editTask.bEdit;

            if (!bEdit) {
                sUrl = this.oData.urlApi.concat("/task/create");
                oData = {
                    OwnerId: sessionStorage["userId"],
                    TaskTitle: $("#idTaskTitle").val(),
                    TaskDetail: $("#idTaskDetail").val(),
                    CategoryCode: this.sCategoryCode,
                    SpecCode: this.sSpecCode,
                    TaskEndda: $("#idDateTaskEndda").val(),
                    TaskPrice: +$("#idPrice").val()
                };
            }

            if (bEdit) {
                sUrl = this.oData.urlApi.concat("/task/edit");
                oData = {
                    TaskId: this.editTask.taskId,
                    OwnerId: sessionStorage["userId"],
                    TaskTitle: $("#idEditTaskTitle").val(),
                    TaskDetail: $("#idEditTaskDetail").val(),
                    CategoryCode: this.editTask.categoryCode,
                    SpecCode: this.editTask.specCode,
                    TaskEndda: $("#idEditDateTaskEndda").val(),
                    TaskPrice: +$("#idEditPrice").val()
                };
            }

            try {
                axios.post(sUrl, oData)
                    .then((response) => {
                        console.log("Успешно");
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка создания', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция получает выбранную специализацию.
        onGetSpec(specName, specCode, categoryName, categoryCode) {
            this.sCategoryName = categoryName;
            this.sSpecName = specName;
            this.sCategoryCode = categoryCode;
            this.sSpecCode = specCode;
        }
    }
}