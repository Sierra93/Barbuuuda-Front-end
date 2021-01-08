/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Container from '../components/container.vue';
import NavMenu from '../components/nav-menu.vue';
import Footer from '../components/footer.vue';
import CreateTask from '../components/create-task.vue';
import CustomerHeader from '../components/customer-header.vue';
import VueRouter from 'vue-router';
import $ from "jquery";
import axios from 'axios';
   
export default {
    name: 'main-page',    
    components: {
        Container,
        NavMenu,
        Footer,
        CreateTask,
        CustomerHeader
    },
    created() {
        this._loadDataFon();
        this._loadDataWhy();
        this._loadGetWork();
        this._loadAdvantages();
        this._loadPriveleges();     

        this.oData.bGuest = localStorage["role"] == "Гость" ? true : false;
        this.oData.bCustomer = localStorage["role"] == "Заказчик" ? true : false;
    },
    data() {
        return {
            oData: {
                // urlApi: "http://localhost:58822",
                urlApi: "https://apphosting.site",
                aHeader: [],
                bGuest: false,
                bCustomer: false
            },
            oEditTask: {
                editTask: {},
                sTypes: {
                    All: "All",
                    Single: "Single"
                }
            },
            aFon: [],
            aWhyis: [],
            aWork: [],
            aAdvantages: [],
            aProveliges: [],
            sPassword: null                                
        }
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
            } 
            
            catch (ex) {
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
            } 
            
            catch (ex) {
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
            } 
            
            catch (ex) {
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
            } 
            
            catch (ex) {
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
            } 
            
            catch (ex) {
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
                    .then((data) => {
                        //no-debugger 
                        //debugger;
                    })

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

            try {
                axios.post(sUrl, {
                        UserEmail: $("#idEma").val(),
                        UserPassword: this.pass
                    })
                    .then((response) => {
                        localStorage["user"] = response.data.sLogin;
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка регистрации', XMLHttpRequest.response.data);
                    });
            }
            
            catch (ex) {
                throw new Error(ex);
            }
        }
    }
}