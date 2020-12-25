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
        this.oData.bGuest = localStorage["role"] == "Гость" ? true : false;
        this.oData.bCustomer = localStorage["role"] == "Заказчик" ? true : false;
        
        if (this.$route.name == "main") {
            this.oData.bCustomer = false;
            this.oData.bExecutor = false;
            this.oData.bGuest = true;
        }

        if (this.$route.name == "create-task" && this.oData.bCustomer) {
            this.oData.bGuest = false;
            this.oData.bExecutor = false;
        }

        if (this.$route.name == "create-task" && this.oData.bExecutor) {
            this.oData.bGuest = false;
            this.oData.bCustomer = false;
        }
    },
    data() {
        return { }
    },    
    props: ['oData'],
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

        // Функция отображает/скрывает левую панель.
        onStateLeftPanel() {
            this.bHideLeftPanel = $(".left-menu").hasClass("left-panel");
            this.bHideLeftPanel ? $(".left-menu").removeClass("left-panel").addClass("left-panel-not-left") : $(".left-menu").removeClass("left-panel-not-left").addClass("left-panel");
        }
    }
}