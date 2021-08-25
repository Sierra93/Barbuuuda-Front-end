/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import CustomerHeader from '../components/customer-header.vue';
import $ from "jquery";
import axios from 'axios';
import VueRouter from 'vue-router';

import { refreshToken } from '../store.js';

let context = null;

export default {
    name: 'customer-header',
    components: {
        CustomerHeader,
        VueRouter
    },

    props: ["oData"],

    created() {
        context = this;

        refreshToken();
    },

    data() {
        return {
            sPassword: null
        }
    },

    methods: {
        // Функция авторизует юзера.
        onLogin() {
            const sUrl = this.oData.urlApi.concat("/user/login");
            let oData = {
                UserName: $("#idEma").val(),
                UserPassword: this.sPassword
            };

            try {
                axios.post(sUrl, oData)
                    .then((response) => {
                        // Если токен есть, то в зависимости от роли распределяет по интерфейсам.
                        if (response.data.userToken) {
                            sessionStorage["userToken"] = response.data.userToken;
                            sessionStorage["role"] = response.data.role;
                            sessionStorage["user"] = response.data.user;
                            // $(".right-panel").hide();
                            this.$router.push("/home");
                            // window.location.href = window.location.href.concat("/home");
                        }
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка авторизации', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        }
    }
}