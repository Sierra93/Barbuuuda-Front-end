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

Vue.use(VueRouter);
Vue.component('Container', Container);
Vue.component('CreateTask', CreateTask);
Vue.component('CHome', CHome);
Vue.component('MyTasks', MyTasks);
Vue.component('ProfileBar', ProfileBar);
Vue.component('calendar', Calendar);
Vue.component('date-picker', DatePicker);

// Общие функции приложения.
const utils = {
  // Функция получает список заданиq выбранной даты в календаре.
  getTasksDate : (date, oData) => { 
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

  install: function(Vue){
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