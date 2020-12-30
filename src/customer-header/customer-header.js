/* eslint-disable */
// eslint-disable-next-line no-unused-vars


import CustomerHeader from '../components/customer-header.vue';
import $ from "jquery";
import axios from 'axios';

export default {
    name: 'customer-header',
    components: {
        CustomerHeader
    },
    props: ['oData'],
    data() {
        return {
            bGuest: false
        }
    },
    created() {
        // this._getAuthorize();
        this.bGuest = localStorage["role"] == "Гость" ? true : false;
    },
    methods: {
         // Функция проверяет авторизован ли юзер. 
         _getAuthorize() {
            let userRole = "";

            if (!localStorage["userToken"] || !localStorage["role"] || localStorage["role"] == "Гость") {
                userRole = "Гость";                
                localStorage["role"] = userRole;                
                this.bGuest = true;
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
            if (value.target && value.target.text == "Barbuuuda") {
                window.location.href = "/";
            }

            else if (value == "Главная") {
                window.location.href = "/";
            }

            else if (value == "Мои заказы") {
                window.location.href = "/tasks/my";
            }

            else if (value == "Создать задание") {
                window.location.href = "/task/create";
            }
        }
    }
}