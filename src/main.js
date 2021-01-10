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

Vue.use(VueRouter);
Vue.component('Container', Container);
Vue.component('CreateTask', CreateTask);
Vue.component('CHome', CHome);
Vue.component('MyTasks', MyTasks);
Vue.component('ProfileBar', ProfileBar);
Vue.component('calendar', Calendar);
Vue.component('date-picker', DatePicker);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');