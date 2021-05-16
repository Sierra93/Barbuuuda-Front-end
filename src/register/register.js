/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import $ from "jquery";
import VueRouter from 'vue-router';
import axios from 'axios';

export default {
    name: 'register',
    components: {
        VueRouter
    },
    props: ['oData'],
    created() {},
    data() {
        return {
            view: false,
            noView: false,
            dblview: false,
            dblNoView: false
        }
    },
    methods: {

        onChangeTab(evt, type) {
            var i, tabcontent, tablinks;

            if (type == "login") {
                $(".tab-role").removeClass("role-show");
                $(".tab-role").addClass("role-hide");
                $(".register").removeClass("selected-role");
                $(".tab-role").addClass("not-selected-role");
            }

            if (type == "register") {
                $(".tab-role").removeClass("role-hide");
                $(".tab-role").addClass("role-show");
                $(".register").addClass("selected-role");
            }

            if (type == "executor") {
                this.role = "E";
            }

            if (type == "customer") {
                this.role = "C";
            }

            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("tabcontent");

            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = document.getElementsByClassName("tablinks");

            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }

            // Show the current tab, and add an "active" class to the button that opened the tab
            document.getElementById(type).style.display = "block";
            evt.currentTarget.className += " active";
        },

        // Проставит по дефолту выделенный таб.
        setSelectedRole() {
            document.getElementById("defaultOpen").click();
        },

        // Функция регистрирует юзера.
        onCreate() {
            const sUrl = this.oData.urlApi.concat("/user/create");
            let oData = {
                UserName: $("#idLogin").val(),
                UserPassword: $("#idPassword").val(),
                Email: $("#idEmail").val(),
                UserRole: this.role
            };

            try {
                axios.post(sUrl, oData)
                    .then((response) => {
                        console.log("Регистрация успешна");
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка регистрации', XMLHttpRequest.response.data);
                    });
            } catch (ex) {
                throw new Error(ex);
            }
        },

        onShowPassword() {

            if ($('.fa-eye').hasClass('noView')) {
                $('#idPassword').attr('type', 'text');

            } else {
                $('#idPassword').attr('type', 'password');
            }

        },
        routLogin() {
            this.$router.push("/login");
        },
    }
}