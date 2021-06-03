/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import CustomerHeader from '../components/customer-header.vue';
import CHome from '../components/home.vue';
import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import $ from "jquery";
import axios from 'axios';

$(function () {    
    __VUE_HOT_MAP__.refreshToken();
});

export default {
    name: 'c-home',
    components: {
        CustomerHeader,
        CHome,
        Calendar,
        DatePicker
    },
    props: ['oData'],
    created() {
        this._loadingActiveTasks();
        this._loadExecutorTest();
        this._loadingCountQuestions();
        this._loadingProfile();
        this._loadingCategoryList();

        if (sessionStorage["role"] == "E") {
            this.onGetInvities();
        }
    },
    data() {
        return {
            picker: new Date(),
            aCalendarTasks: [],
            aQuestion: [],
            isHideStepsTest: false,
            iQuestionsCount: null,
            aAnswers: [],
            currentQuestion: null,
            currentQuestionNumber: null,
            isHidePanelTest: false,
            isHidePanelStartTest: false,
            aProfileData: [],
            aCategories: [],
            aExecutorSpecializations: [],
            checked: null,
            aInvities: [],
            bActivity: false,
            bAccept: false,
            bCancel: false
        }
    },    
    methods: {
        // Функция получает активные задания заказчика.
        _loadingActiveTasks() {
            const sUrl = this.oData.urlApi.concat("/task/active");

            try {
                axios.get(sUrl)
                    .then((response) => {         
                        console.log("Активные задания", response.data);
                        this.oData.aTasks = response.data;
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка активных заданий', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция получает задания выбранной даты в календаре.
        onGetDate(date) {                   
            let oData = this.$parent.oData;                     
            this.utils.getTasksDate(date, oData);
            
            setTimeout(() => {
                this.$parent.oData.aTasks = window.aTasks;
            }, 100);
        },

        // Функция выгружает данные для теста исполнителей.
        _loadExecutorTest() {
            if (!sessionStorage["role"] == "E") {
                return;
            }

            const sUrl = this.oData.urlApi.concat("/executor/answer?numberQuestion=1");

            try {
                axios.get(sUrl)
                    .then((response) => {         
                        console.log("Вопросы для теста исполнителей", response.data);
                        this.aQuestion.push(response.data);
                        this.currentQuestion = 1;
                        this.currentQuestionNumber = 1;
                        console.log("Текущий вопрос", this.currentQuestionNumber);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка вопросы для теста исполнителей', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция получает кол-во вопросов для теста исполнителя.
        _loadingCountQuestions() {
            const sUrl = this.oData.urlApi.concat("/executor/answers-count");

            try {
                axios.get(sUrl)
                    .then((response) => {         
                        console.log("Кол-во вопросов", response.data);
                        this.iQuestionsCount = response.data;                        
                    })

                    .catch((XMLHttpRequest) => {
                        // if (XMLHttpRequest.response.status === 401) {
                        //     sessionStorage.clear();
                        //     localStorage.clear();
                        //     this.$router.push("/");
                        // }

                        throw new Error('Ошибка кол-во вопросов', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция получает следующий вопрос для теста исполнителя.
        onNextQuestion() {
            let value = $("#idSelectedVariant:checked").parent().text();

            if (value == "") {
                $('#idNotSelectedVariant').modal('show');
                return;
            }

            this.aAnswers.push({
                answerVariantText: value,
                isRight: null,
                selected: false,
                questionNumber: this.currentQuestion
            });
            console.log("Массив с ответами", this.aAnswers);

            // Для получения второго вопроса, так как первый уже был выгружен изначально.
            if (this.currentQuestionNumber == 1) {
                this.currentQuestionNumber++;                
            }

            const sUrl = this.oData.urlApi.concat("/executor/answer?numberQuestion=".concat(this.currentQuestionNumber));            

            try {
                axios.get(sUrl)
                    .then((response) => {         
                        console.log("Вопросы для теста исполнителей", response.data);
                        this.aQuestion = [];
                        this.aQuestion.push(response.data);
                        this.currentQuestion++;   
                        this.currentQuestionNumber++;          
                        console.log("Вопрос", this.currentQuestion);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка вопросы для теста исполнителей', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция отправляет массив с ответами на тест исполнителя для проверки.
        onCheckAnswersTest() {
            const sUrl = this.oData.urlApi.concat("/executor/check");            

            try {
                axios.post(sUrl, this.aAnswers)
                    .then((response) => {                            
                        console.log("Пройден ли тест", response.data);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Прохождения теста', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        onStartSteps() {
            this.isHidePanelTest = true;            
            this.isHideStepsTest = true;
        },

        onStartTest() {
            this.isHidePanelStartTest = true;
            this.isHidePanelTest = true;
            this.isHidePanelTest = false;
        },
        
         // Функция загружает всю информацию профиля.
         _loadingProfile() {
            let oData = this.$parent.oData;
            let sUrl = oData.urlApi.concat("/user/profile");

            axios.get(sUrl)
                .then((response) => {
                    this.aProfileData.push(response.data);
                    oData.dateRegister = response.data.dateRegister.split(".")[0];
                    console.log("Данные профиля", this.aProfileData);
                })

                .catch((XMLHttpRequest) => {
                    throw new Error(XMLHttpRequest.response.data);
                });
        },

         // Функция выгружает список категорий заданий.
         _loadingCategoryList() {
            let sUrl = this.$parent.oData.urlApi.concat("/main/category-list");
            this.utils.getTaskCategories(sUrl);
            this.aCategories = window.aTaskCategories;
        },

        // Функция сохраняет выбранные специализации исполнителя.
        onSaveSpecies() {
            let sUrl = this.$parent.oData.urlApi.concat("/executor/add-spec");

            axios.post(sUrl, this.aExecutorSpecializations)
                .then((response) => {
                    console.log("Специализации сохранены");
                })

                .catch((XMLHttpRequest) => {
                    throw new Error(XMLHttpRequest.response.data);
                });
        },

        // Функция добавляет специализацию.
        onSelectSpec(bCheck, specName) {
            if (bCheck) {
                // Добавит специализацию в массив.
                this.aExecutorSpecializations.push({ SpecName: specName });
                console.log("checked true", this.aExecutorSpecializations);
                return;
            }    
            console.log("checked false");        
        },

        // Функция получит список заданий, в которых был выбран исполнитель.
        onGetInvities() {
            let sUrl = this.oData.urlApi.concat("/executor/invite");

            axios.post(sUrl)
                .then((response) => {
                    this.aInvities = response.data.invities;
                    console.log("Список приглашений", response.data);

                    if (response.data.invities.length > 0) {
                        this.bActivity = true;
                    }
                })

                .catch((XMLHttpRequest) => {
                    throw new Error(XMLHttpRequest.response.data);
                });
        },

        // Функция принятия в работу задания.
        onAcceptTask(taskId) {
            let sUrl = this.oData.urlApi.concat("/executor/accept");
            let oTaskData = {
                TaskId: taskId
            };

            axios.post(sUrl, oTaskData)
                .then((response) => {
                    console.log("Задача ".concat(taskId).concat(" принята в работу"), response.data);

                    if (response.data) {
                        this.bAccept = true;

                        return this.onGetInvities();
                    }
                })

                .catch((XMLHttpRequest) => {
                    throw new Error(XMLHttpRequest.response.data);
                });
        },

        // Функция отказа от работы над заданием.
        onCancelTask(taskId) {
            let sUrl = this.oData.urlApi.concat("/executor/cancel");
            let oTaskData = {
                TaskId: taskId
            };

            axios.post(sUrl, oTaskData)
                .then((response) => {
                    console.log("Задача ".concat(taskId).concat(" отклонена"), response.data);

                    if (response.data) {
                        this.bCancel = true;

                        return this.onGetInvities();
                    }
                })

                .catch((XMLHttpRequest) => {
                    throw new Error(XMLHttpRequest.response.data);
                });
        }
    }
}