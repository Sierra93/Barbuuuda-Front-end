/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import $ from "jquery";
import Container from './components/container.vue';
import CreateTask from './components/create-task.vue';
import CHome from './components/home.vue';
import MyTasks from './components/my-tasks.vue';
import ProfileBar from './components/profile-bar.vue';
import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import axios from 'axios';
import Categories from './components/categories.vue';
import Auction from './components/auction.vue';
import CProfile from './components/c-profile.vue';
import ExecutorList from './components/executor-list.vue';
import vueHeadful from 'vue-headful';
import PublicOffer from './components/public-offer.vue';
import Payment from './components/payment.vue';
import Register from './components/register.vue';
import Login from './components/login.vue';

Vue.use(VueRouter);
Vue.component('Container', Container);
Vue.component('CreateTask', CreateTask);
Vue.component('CHome', CHome);
Vue.component('MyTasks', MyTasks);
Vue.component('ProfileBar', ProfileBar);
Vue.component('calendar', Calendar);
Vue.component('date-picker', DatePicker);
Vue.component('categories', Categories);
Vue.component('auction', Auction);
Vue.component('CProfile', CProfile);
Vue.component('ExecutorList', ExecutorList);
Vue.component('vue-headful', vueHeadful);
Vue.component('PublicOffer', PublicOffer);
Vue.component('Payment', Payment);
Vue.component('Register', Register);
Vue.component('Login', Login);

// Общие функции приложения.
const utils = {
  // Функция получает список заданий выбранной даты в календаре.
  getTasksDate: (date, oData) => { 
    let formatDate = date.toLocaleString();
    const sUrl = oData.urlApi.concat("/task/concretely-date?date=".concat(formatDate));

    try {
        axios.get(sUrl)
            .then((response) => {                      
                window.aTasks = response.data;
            })

            .catch((XMLHttpRequest) => {
                throw new Error('Ошибка получения заданий выбранной даты', XMLHttpRequest.response.data);
            });
    } 
    
    catch (ex) {
        throw new Error(ex);
    }
  },

  // Функция получает список всех категорий.
  getTaskCategories: (sUrl) => {
    axios.get(sUrl)
      .then((response) => {
        window.aTaskCategories = response.data;
        console.log("Список категорий заданий", window.aTaskCategories);
      })

      .catch((XMLHttpRequest) => {
        throw new Error(XMLHttpRequest.response.data);
      });
  },

  replaceSpacesPrice: (price) => {
    return price.replace(/\s/g, '');
  },

  // Функция отсчитывает время бездействия юзера, по окончании простоя убивает сессию и перенаправляет на стартовую для авторизации.
  deadlineSession: () => {
    var idleTime = 0;

    $(document).ready(function () {
        //Increment the idle time counter every minute.
        var idleInterval = setInterval(timerIncrement, 60000); // 1 minute
    
        //Zero the idle timer on mouse movement.
        $(this).mousemove(function (e) {
            idleTime = 0;
        });

        $(this).keypress(function (e) {
            idleTime = 0;
        });
    });
    
    function timerIncrement() {
        idleTime = idleTime + 1;

        if (idleTime > 19) { // 20 minutes
            sessionStorage.clear();
            localStorage.clear();
            $(".right-panel").show();
            this.$router.push("/");
        }
    }    
  },

  // Функция обновит токен через каждые 9 мин.
  // refreshToken: (sUrl) => {    
  //   function refresh() { 
  //     axios.get(sUrl)
  //     .then((response) => {
  //       sessionStorage.userToken = response.data;
  //       console.log("refresh token");
  //     })

  //     .catch((XMLHttpRequest) => {
  //       throw new Error(XMLHttpRequest.response.data);
  //     });
  //   }

  //   let intervalID = setInterval(refresh, 530000)  // 9 минут.

  //   if (!sessionStorage.userToken) {
  //     clearInterval(intervalID);
  //   }
  // },

  install: function(Vue) {
    Object.defineProperty(Vue.prototype, 'utils', {
      get () { return utils }
    })
  }
};

Vue.use(utils);

new Vue({
  render: h => h(App),
  router
}).$mount('#app');