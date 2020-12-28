/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from './components/container.vue';
import CreateTask from './components/create-task.vue';
import CHome from './components/home.vue';

Vue.use(VueRouter);
Vue.component('Container', Container);
Vue.component('CreateTask', CreateTask);
Vue.component('CHome', CHome);

new Vue({
    render: h => h(App),
    router,
  }).$mount('#app');