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
    
            if (this.$route.name == "task/create" && this.oData.bCustomer) {
                this.oData.bGuest = false;
                this.oData.bExecutor = false;
            }

            if (this.$route.name == "categories" && this.oData.bCustomer) {
                this.oData.bGuest = false;
                this.oData.bExecutor = false;                
            }
    
            if (this.$route.name == "task/create" && this.oData.bExecutor) {
                this.oData.bGuest = false;
                this.oData.bCustomer = false;
            }
        },

        // Функция проверяет авторизован ли юзер. 
        _getAuthorize() {
            let userRole = "";

            if (!localStorage["userToken"] || !localStorage["role"]) {
                userRole = "Гость";                
                localStorage["role"] = userRole;                
                this.bGuest = true;
            }

            if (localStorage["role"] == "Гость") {
                userRole = "Гость";                
                localStorage["role"] = userRole;                
                this.bGuest = true;
                return;
            }

            else {
                userRole = localStorage["role"];
                this.bGuest = false;
            }

            // Формирует поля хидера для гостя.
            const sUrl = this.oData.urlApi.concat("/user/authorize");

            try {
                axios.post(sUrl, {
                    UserLogin: localStorage["user"],
                    UserRole: userRole
                })
                    .then((response) => {
                        response.data.aHeaderFields.forEach(el => {
                            this.oData.aHeader.push(el.headerField); 
                        });   

                        localStorage["userId"] = response.data.userId;
                        console.log("Хидер юзера", this.oData.aHeader);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка получения полей хидера', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция отображает/скрывает левую панель.
        onStateLeftPanel() {
            this.bHideLeftPanel = $(".left-menu").hasClass("left-panel");
            this.bHideLeftPanel ? $(".left-menu").removeClass("left-panel").addClass("left-panel-not-left") : $(".left-menu").removeClass("left-panel-not-left").addClass("left-panel");
        }        
    }
}