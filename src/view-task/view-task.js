/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import NavMenu from '../components/nav-menu.vue';
import $ from "jquery";
import VueRouter from 'vue-router';
import axios from 'axios';
import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';

$(function () {    
    // TODO: Переделать на другой способ глобального хранения! 
    __VUE_HOT_MAP__.refreshToken();
});

export default {
    name: 'view-task',
    components: {
        NavMenu,
        VueRouter,
        Calendar,
        DatePicker
    },
    created() {
        this._loadingResponds();
        this._loadingDialogs();        
    },
    // mounted() {
    //     paypal.Buttons().render('#paypal-button-container');
    // },
    data() {
        return {
            picker: new Date(),
            price: null,
            comment: "",
            aResponds: [],
            isRespond: false,
            bOpen : false,
            respondCount: null,
            aDialogs: [],
            statusArea: "",
            aMessages: [],
            dialogId: null,
            message: "",
            firstName: "",
            lastName: "",
            userName: ""
         }
    },    
    props: ["oData", "oEditTask"],
    methods: {       
        getImgUrl(img) {
            if (img !== null) {
                return require('../assets/images/' + img);
            }     
        },

        // Функция переходит к изменению задания.
        onEditTask() {
            this.oEditTask.editTask.bEdit = true;
            this.$router.push("/task/create");
        },

        // Функция покажет модалку об удалении задания.
        onShowDeleteModal() {
            $('#idAcceptDeleteTask').modal('show');
        },

        // Функция покажет модалку ставки к заданию.
        onShowRespondModal() {
            if (sessionStorage["role"] == "E") {
                this._checkRespond();

                if (this.isRespond) {
                    $('#idRespond').modal('show');
                    return;
                }

                return;
            }
        },

        // Функция удаляет задание.
        OnDeleteTask() {
            let taskId = this.oEditTask.editTask[0].taskId;
            let sUrl = this.oData.urlApi.concat("/task/delete/".concat(taskId));
            
            try {
                axios.get(sUrl)
                    .then((response) => {
                        this.$router.push("/tasks/my");
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка удаления', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция оставляет ставку к заданию.
        onRespond(price, comment) {
            let sUrl = this.oData.urlApi.concat("/executor/respond/");
            let oRespond = {
                Price: price,
                Comment: comment,
                TaskId: this.oData.oViewTaskId
            };
            
            try {
                axios.post(sUrl, oRespond)
                    .then((response) => {
                        console.log("Ставка к заданию сделана");
                        this._loadingResponds();
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка оставления ставки к заданию', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция получит список ставок к заданию.
        _loadingResponds() {
            let sUrl = this.oData.urlApi.concat("/task/get-responds");

            try {
                axios.post(sUrl, { TaskId: this.oData.oViewTaskId })
                    .then((response) => {
                        console.log("Список ставок к заданию", response.data);
                        this.aResponds = response.data.responds;
                        this.respondCount = response.data.count;
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка получения ставок к заданию', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },        

        // Функция проверит, делал ли уже ставку текущий исполнитель.
        _checkRespond() {
            let sUrl = this.oData.urlApi.concat("/executor/check-respond");

            try {
                axios.post(sUrl, { TaskId: this.oData.oViewTaskId })
                    .then((response) => {
                        this.isRespond = response.data;
                        console.log(this.isRespond);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error(XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция разрешит или запретит нажатие кнопки "СДЕЛАТЬ СТАВКУ".
        onTogglebRespondsOpen(e) {
            let isOpen = $("#idOpen").prop("open");

            if (!isOpen) {
                this.bOpen = true;
                return;
            }

            this.bOpen = false;
        },

        // Функция подгружает список диалогов чата.
        _loadingDialogs() {
            let sUrl = this.oData.urlApi.concat("/chat/dialogs");

            try {
                axios.post(sUrl)
                    .then((response) => {
                        this.aDialogs = response.data.dialogs;
                        console.log("Список диалогов", this.aDialogs);
                        this._openEmptyDialogArea();
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error("Ошибка списка диалогов", XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция откроет пустую область чата.
        _openEmptyDialogArea() {
            let sUrl = this.oData.urlApi.concat("/chat/dialog");

            try {
                axios.post(sUrl, { DialogId: null })
                    .then((response) => {
                        this.statusArea = response.data.dialogState;
                        console.log("Пустая область чата открыта", this.statusArea);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error("Ошибка открытия пустой области чата", XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция получит список сообщений диалога.
        onGetDialogMessages(dialogId) {
            let sUrl = this.oData.urlApi.concat("/chat/dialog");
            this.dialogId = dialogId;

            try {
                axios.post(sUrl, { DialogId: this.dialogId })
                    .then((response) => {
                        this.aMessages = response.data.messages;
                        console.log("Список сообщений диалога c Id: " + dialogId, response.data);
                        this.statusArea = response.data.dialogState;
                        this.firstName = response.data.firstName;
                        this.lastName = response.data.lastName;
                        this.userName = response.data.userName;
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error("Ошибка сообщений диалога", XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция отправит сообщение.
        onSend() {
            let sUrl = this.oData.urlApi.concat("/chat/send");
            let oDataMessage = {
                DialogId: this.dialogId,
                Message: this.message
            };

            try {
                axios.post(sUrl, oDataMessage)
                    .then((response) => {
                        this.aMessages = response.data.messages;
                        console.log("Сообщение успешно отправлено", this.aMessages);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error("Ошибка отправки сообщения", XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция откроет чат.
        onShowChat() {
            $("#idChat").modal("toggle");
        },

        // Функция ответа на ставку исполнителя. Откроет чат с сообщениями диалога с исполнителем.
        onAnswer(executorId) {
            let sUrl = this.oData.urlApi.concat("/chat/dialog");
            let oRespond = {
                ExecutorId: executorId,
                IsWriteBtn: true
            };

            try {
                axios.post(sUrl, oRespond)
                    .then((response) => {
                        this.aMessages = response.data.messages;
                        this.statusArea = response.data.dialogState;
                        $("#idChat").modal("toggle");
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