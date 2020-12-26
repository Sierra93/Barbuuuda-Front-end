import VueRouter from 'vue-router'
import Container from './components/container.vue';
// import NavMenu from './components/nav-menu.vue';
import CreateTask from './components/create-task.vue';

export default new VueRouter({
  routes: [
    {
        path: '/',
        name: 'main',
        component: Container,
        props: true
      },
    {
      path: '/task/create',
      name: 'task/create',
      component: CreateTask,
      props: true
    }
  ],
  mode: 'history'
})