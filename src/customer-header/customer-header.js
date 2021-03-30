/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import CustomerHeader from '../components/customer-header.vue';
import $ from "jquery";
import axios from 'axios';
import VueRouter from 'vue-router';

$(function () {    
    __VUE_HOT_MAP__.refreshToken();
});

export default {
    name: 'customer-header',
    components: {
        CustomerHeader,
        VueRouter
    },
    props: ["oData", "oEditTask"],
    data() {
        return {
            bGuest: false,
            bCreateBtn: false
        }
    },
    created() {
        this.bGuest = sessionStorage["role"] == "G" ? true : false;        
    },    
    methods: {
         // Функция проверяет авторизован ли юзер. 
         _getAuthorize() {
            let userRole = "";

            if (!sessionStorage["userToken"] || !sessionStorage["role"] || sessionStorage["role"] == "G") {
                userRole = "G";                
                sessionStorage["role"] = userRole;                
                this.bGuest = true;
            }

            else {
                userRole = sessionStorage["role"];
                this.bGuest = false;
            }

            // Формирует поля хидера для гостя.
            const sUrl = this.oData.urlApi.concat("/user/authorize");

            try {
                axios.post(sUrl, {
                    UserLogin: sessionStorage["user"],
                    UserRole: userRole
                })
                    .then((response) => {
                        response.data.aHeaderFields.forEach(el => {
                            this.oData.aHeader.push(el.headerField); 
                        });                        
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

        // Функция распределяет по пунктам хидера.
        onGetMenu(value) {
            if (value.target && value.currentTarget.text == " Barbuuuda ") {
                this.oData.bGuest = true;
                this.$router.push("/");
            }

            else if (value == "Главная") {
                this.$router.push("/home");
            }

            else if (value == "Мои задания") {                
                this.$router.push("/tasks/my");
            }

            else if (value == "Создать задание") {
                this.oEditTask.editTask.bEdit = false;
                this.$router.push("/task/create");
            }

            else if (value == "Аукцион заданий") {
                this.oEditTask.editTask.bEdit = false;
                this.$router.push("/auction");
            }
        },

        onGoProfile() {
            this.$router.push("/profile");
        }    
    }
}