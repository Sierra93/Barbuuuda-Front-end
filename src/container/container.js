/* eslint-disable */
// eslint-disable-next-line no-unused-vars

debugger;

import Vue from "vue";
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
        CreateTask,
        VueRouter
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
            aHope: [],
            role: null
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
        this._loadingLastTasks();
        this._getAuthorize();
        this._initHeader();
    },
    props: ['oData'],
    methods: {
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
            } else {
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

                        //Удалит токен юзера.Теперь нужно снова авторизоваться.
                        else {
                            sessionStorage.clear();
                        }
                    });
            } catch (ex) {
                throw new Error(ex);
            }
        },

        //Функция отображает/скрывает левую панель.
        onStateLeftPanel() {
            this.bHideLeftPanel = $(".left-menu").hasClass("left-panel");
            this.bHideLeftPanel ? $(".left-menu").removeClass("left-panel").addClass("left-panel-not-left") :
                $(".left-menu").removeClass("left-panel-not-left").addClass("left-panel");
            if ($(".left-menu").hasClass("left-panel-not-left")) {
                $(".aside").width(240);
                $(".div-link").css("margin-right", "-0.5rem");
                $(".blue").width(195);
            }
        },

        autoClose() {
            $(".block-main-fon").on("mousedown", function () {
                $(".left-menu").removeClass("left-panel-not-left").addClass("left-panel");
                $(".aside").width(80);
            });
        },

        getImgUrl(pic) {
            if (pic !== null) {
                return require('../assets/images/' + pic);
            }
        },
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
                            $(".div-link").hide();
                            // this.$router.push("/home");
                            window.location.href = window.location.href.concat("home");
                        }
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка авторизации', XMLHttpRequest.response.data);
                    });
            } catch (ex) {
                throw new Error(ex);
            }
        },

        onRouteCreateTask() {
            // Если нет роли заказчик, то будет ошибка.
            if (sessionStorage["role"] !== "C") {
                $('#idNotCustomer').modal('show');
                return;
            }

            this.$router.push("/task/create");
        },

        // Функция выгружает список категорий заданий.
        _loadingCategoryList() {
            let sUrl = this.$parent.oData.urlApi.concat("/main/category-list");
            this.utils.getTaskCategories(sUrl);

            setTimeout(() => {
                this.$parent.oData.aCategories = window.aTaskCategories;

                // this.$parent.oData.aCategories.map(el => {
                //     // el.url = require(el.url);
                //     // this.images.push(el.url);
                //     // console.log("arr", this.images);
                //     return require(el.url);
                // });
            }, 1000);
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
            } catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция выгружает список последних заданий 5 шт., не важно, чьи они.
        _loadingLastTasks() {
            let sUrl = this.$parent.oData.urlApi.concat("/main/last");

            try {
                axios.get(sUrl)
                    .then((response) => {
                        this.oData.aLastTasks = response.data;
                        console.log("Последние задания", this.oData.aLastTasks);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error(XMLHttpRequest.response.data);
                    });
            } catch (ex) {
                throw new Error(ex);
            }
        },

        onRouteExecutors() {
            this.$router.push("/executors-list");
        },

        ontest() {
            let sUrl = this.$parent.oData.urlApi.concat("/executor/add-spec");
            let oSaveData = {
                "Specializations": [{
                        "SpecName": "Специализация1"
                    },
                    {
                        "SpecName": "Специализация2"
                    }
                ]
            };

            axios.post(sUrl, oSaveData)
                .then((response) => {

                })

                .catch((XMLHttpRequest) => {
                    throw new Error(XMLHttpRequest.response.data);
                });
        }
    }
}

//джс шапки