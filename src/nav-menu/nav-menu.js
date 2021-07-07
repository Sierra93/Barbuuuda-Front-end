/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import NavMenu from '../components/nav-menu.vue';
import $ from "jquery";
import VueRouter from 'vue-router';
import axios from 'axios';

import { refreshToken } from '../store.js';

export default {
    name: 'nav-menu',
    components: {
        NavMenu,
        VueRouter
    },
    created() {
        this._getAuthorize();   
        this._initHeader();      
        refreshToken();          
    },
    data() {
        return {
            
         }
    },    
    props: ['oData'],
    methods: {
        // Функция проставит хидер в зависимости от роли юзера.
        _initHeader() {
            // Начало цепочки проверок для хидера.
            if (this.$route.name == "main") {
                this.oData.bCustomer = false;
                this.oData.bExecutor = false;
                this.oData.bGuest = true;
                this._showGuestHeader();
            }
    
            if (this.$route.name == "task-create" && this.oData.bCustomer) {
                this.oData.bGuest = false;
                this.oData.bExecutor = false;
                this._showGuestHeader();
            }

            if (this.$route.name == "categories" && this.oData.bCustomer) {
                this.oData.bGuest = false;
                this.oData.bExecutor = false;     
                this._showGuestHeader();           
            }

            if (this.$route.name == "auction" && this.oData.bCustomer) {
                this.oData.bGuest = false;
                this.oData.bExecutor = false;      
                this._showGuestHeader();          
            }

            if (this.$route.name == "auction" && this.oData.bExecutor) {
                this.oData.bGuest = false;
                this.oData.bCustomer = false;
                this.oData.bExecutor = true;        
                this._showGuestHeader();        
            }
    
            if (this.$route.name == "task-create" && this.oData.bExecutor) {
                this.oData.bGuest = false;
                this.oData.bCustomer = false;
                this.oData.bExecutor = true;   
                this._showGuestHeader();
            }            

            if (this.$route.name == "e-home") {
                this.oData.bGuest = false;
                this.oData.bCustomer = false;
                this.oData.bExecutor = true;            
                this._showGuestHeader();       
            }     

            if (this.$route.name == "login" || this.$route.name == "register") {                
                this.oData.bExecutor = true;        
                this._hideGuestHeader();                   
            }            
            // Конец цепочки проверок для хидера.
        },

        // Функция проверяет авторизован ли юзер. 
        _getAuthorize() {
            let userRole = "";

            if (!sessionStorage["userToken"] && this.$route.name !== "public-offer" 
            && this.$route.name !== "register" && this.$route.name !== "login") {
                this.$router.push("/");
            }

            if (!sessionStorage["userToken"] || !sessionStorage["role"]) {
                userRole = "G";                
                sessionStorage["role"] = userRole;                
                this.bGuest = true;
            }

            if (sessionStorage["role"] == "G") {
                userRole = "G";                
                sessionStorage["role"] = userRole;                
                this.bGuest = true;
                return;
            }

            else {
                userRole = sessionStorage["role"];
                this.bGuest = false;
            }

            // Формирует поля хидера для гостя.
            const sUrl = this.oData.urlApi.concat("/user/authorize?userName=".concat(sessionStorage["user"]));

            try {
                axios.get(sUrl)
                    .then((response) => {        
                        // Если не страница регистрации и не страница авторизации, то запишет поля хидера.               
                        if (this.$route.name !== "login" && this.$route.name !== "register") {
                            response.data.aHeaderFields.forEach(el => {
                                this.oData.aHeader.push(el.headerField);
                            });
                        }

                        console.log("Хидер юзера", this.oData.aHeader);
                    })

                    // Токен протух, получить новый.
                    .catch((XMLHttpRequest) => {
                        if (sessionStorage["user"] !== undefined && sessionStorage["user"] !== "") {
                            var sTokenUrl = this.oData.urlApi.concat("/user/authorize?userName=").concat(sessionStorage["user"]);
                            axios.get(sTokenUrl)
                                .then((response) => {
                                    sessionStorage["userToken"] = response.data;
                                })
                        }

                        // Удалит токен юзера. Теперь нужно снова авторизоваться.
                        else {
                            sessionStorage.clear();                            
                        }
                    });
            }
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция отображает/скрывает левую панель.
        onStateLeftPanel() {
            this.bHideLeftPanel = $(".left-menu").hasClass("left-panel");
            this.bHideLeftPanel ? $(".left-menu").removeClass("left-panel").addClass("left-panel-not-left") 
            : $(".left-menu").removeClass("left-panel-not-left").addClass("left-panel");
        },
        
        onRouteCreateTask() {
            // Если нет роли заказчик, то будет ошибка.
            if (sessionStorage["role"] !== "C") {
                $('#idNotCustomer').modal('show');
                return;
            }

            this.$router.push("/task/create");
        },  

        // Функция скроет гостевой хидер.
        _hideGuestHeader() {
            this.oData.bHideHeader = true;
        },

        // Функция покажет гостевой хидер.
        _showGuestHeader() {
            this.oData.bHideHeader = false;
        }
    }
}