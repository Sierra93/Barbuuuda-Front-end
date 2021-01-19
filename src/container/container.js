/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Container from '../components/container.vue';
import NavMenu from '../components/nav-menu.vue';
import Footer from '../components/footer.vue';
import CreateTask from '../components/create-task.vue';
import VueRouter from 'vue-router';
import $ from "jquery";
import axios from 'axios';

export default {
    name: 'container',
    components: {
        Container,
        NavMenu,
        Footer,
        CreateTask
    },
    props: ['oData'],
    data() {
        return {
            aFon: [],
            aWhyis: [],
            aWork: [],
            aAdvantages: [],
            aProveliges: [],
            sPassword: null,
            aHope: []
        }
    },
    created() {
        this._loadDataFon();
        this._loadDataWhy();
        this._loadGetWork();
        this._loadAdvantages();
        this._loadPriveleges();
        this._loadingCategoryList();
        // this.setSelectedRole();
        this._loadHope();
    },
    methods: {
        // Функция выгружает данные для фона.
        _loadDataFon() {
            const sUrl = this.oData.urlApi.concat("/main/get-fon");

            try {
                axios.post(sUrl)
                    .then((response) => {
                        this.aFon.push(response.data);
                        console.log("Данные фона", this.aFon);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка получения данных фона', XMLHttpRequest.response.data);
                    });
            } catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция выгружает данные для блока "Почему".
        _loadDataWhy() {
            const sUrl = this.oData.urlApi.concat("/main/get-why");

            try {
                axios.post(sUrl)
                    .then((response) => {
                        this.aWhyis = response.data;
                        console.log("Данные почему", this.aWhyis);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка получения данных почему', XMLHttpRequest.response.data);
                    });
            } catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция выгружает данные для блока "Как это работает".
        _loadGetWork() {
            const sUrl = this.oData.urlApi.concat("/main/get-work");

            try {
                axios.post(sUrl)
                    .then((response) => {
                        this.aWork = response.data;
                        console.log("Данные как это работает", this.aWork);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка получения данных как это работает', XMLHttpRequest.response.data);
                    });
            } catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция выгружает данные для блока "Наши преимущества".
        _loadAdvantages() {
            const sUrl = this.oData.urlApi.concat("/main/get-advantage");

            try {
                axios.post(sUrl)
                    .then((response) => {
                        this.aAdvantages = response.data;
                        console.log("Данные преимущества", this.aAdvantages);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка получения данных преимущества', XMLHttpRequest.response.data);
                    });
            } catch (ex) {
                throw new Error(ex);
            }
        },

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

        // Функция выгружает данные для блока "Наши преимущества".
        _loadPriveleges() {
            const sUrl = this.oData.urlApi.concat("/main/get-privilege");

            try {
                axios.post(sUrl)
                    .then((response) => {
                        this.aProveliges = response.data;
                        console.log("Данные привелегий", this.aProveliges);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка получения данных привелегий', XMLHttpRequest.response.data);
                    });
            } catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция регистрирует юзера.
        onCreate() {
            const sUrl = this.oData.urlApi.concat("/user/create");

            try {
                axios.post(sUrl, {
                        UserLogin: $("#idLog").val(),
                        UserPassword: $("#idPass").val(),
                        UserEmail: $("#idEma").val(),
                        UserPhone: $("#idNum").val()
                    })
                    .then((response) => {})

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка регистрации', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция авторизует юзера.
        onLogin() {
            const sUrl = this.oData.urlApi.concat("/user/login");
            let oData = {
                UserEmail: $("#idEma").val(),
                UserPassword: this.sPassword
            };

            try {
                axios.post(sUrl, oData)
                    .then((response) => {
                        // Если токен есть, то в зависимости от роли распределяет по интерфейсам.
                        if (response.data.access_token && response.data.role == "Заказчик") {
                            localStorage["userToken"] = response.data.access_token;
                            localStorage["role"] = response.data.role;
                            localStorage["user"] = response.data.username;
                        }
                        console.log("Авторизация прошла успешно");
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка авторизации', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        onRouteCreateTask() {
            // Если нет роли заказчик, то будет ошибка.
            if (localStorage["role"] !== "Заказчик") {
                $('#idNotCustomer').modal('show');
                return;
            }

            this.$router.push("/task/create");
        },

        // Функция выгружает список категорий заданий.
        _loadingCategoryList() {
            let sUrl = this.$parent.oData.urlApi.concat("/main/category-list");
            this.utils.getTaskCategories(sUrl);
            this.$parent.oData.aCategories = window.aTaskCategories;
        },

        // Функция выгружает данные долгосрочного сотрудничества.
        _loadHope() {
            let sUrl = this.$parent.oData.urlApi.concat("/main/get-hope");
            
            try {
                axios.get(sUrl)
                    .then((response) => {
                        this.aHope.push(response.data);
                        console.log("Данные сотрудничества", this.aHope);
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