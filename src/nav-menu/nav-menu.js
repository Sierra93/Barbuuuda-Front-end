/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import NavMenu from '../components/nav-menu.vue';
import $ from "jquery";
import VueRouter from 'vue-router';
import axios from 'axios';

export default {
    name: 'nav-menu',
    components: {
        NavMenu,
        VueRouter
    },
    created() {
        this._getAuthorize();   
        this._initHeader();                
    },
    data() {
        return {
            
         }
    },    
    props: ['oData'],
    methods: {
        // Функция проставит хидер в зависимости от роли юзера.
        _initHeader() {
            if (this.$route.name == "main") {
                this.oData.bCustomer = false;
                this.oData.bExecutor = false;
                this.oData.bGuest = true;
            }
    
            if (this.$route.name == "task-create" && this.oData.bCustomer) {
                this.oData.bGuest = false;
                this.oData.bExecutor = false;
            }

            if (this.$route.name == "categories" && this.oData.bCustomer) {
                this.oData.bGuest = false;
                this.oData.bExecutor = false;                
            }

            if (this.$route.name == "auction" && this.oData.bCustomer) {
                this.oData.bGuest = false;
                this.oData.bExecutor = false;                
            }

            if (this.$route.name == "auction" && this.oData.bExecutor) {
                this.oData.bGuest = false;
                this.oData.bCustomer = false;
                this.oData.bExecutor = true;                
            }
    
            if (this.$route.name == "task-create" && this.oData.bExecutor) {
                this.oData.bGuest = false;
                this.oData.bCustomer = false;
                this.oData.bExecutor = true;   
            }            

            if (this.$route.name == "e-home") {
                this.oData.bGuest = false;
                this.oData.bCustomer = false;
                this.oData.bExecutor = true;   
            }     
        },

        // Функция проверяет авторизован ли юзер. 
        _getAuthorize() {
            let userRole = "";

            if (!sessionStorage["userToken"]) {
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
                        response.data.aHeaderFields.forEach(el => {
                            this.oData.aHeader.push(el.headerField);
                        });

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
        }       
    }
}