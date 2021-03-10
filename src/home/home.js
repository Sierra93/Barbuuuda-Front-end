/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import CustomerHeader from '../components/customer-header.vue';
import CHome from '../components/home.vue';
import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import $ from "jquery";
import axios from 'axios';

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
    },
    data() {
        return {
            picker: new Date(),
            aCalendarTasks: [],
            aQuestion: [],
            bStartTest: false,
            iQuestionsCount: null,
            aAnswers: [],
            currentQuestion: null,
            currentQuestionNumber: null
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
                        throw new Error('Ошибка кол-во вопросов', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция проставит варианту ответа selected: true и добавит в массив ответов.
        // onAddVariant(variant) {
        //     console.log("Выбрали", variant);
        //     variant.selected = true;
        //     this.aAnswers.push(variant);
        //     console.log("Массив с ответами", this.aAnswers);
        // },

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
        }
    }
}