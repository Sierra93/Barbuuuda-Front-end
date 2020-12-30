import VueRouter from 'vue-router'
import Container from './components/container.vue';
// import NavMenu from './components/nav-menu.vue';
import CreateTask from './components/create-task.vue';
import CHome from './components/home.vue';
import MyTasks from './components/my-tasks.vue';

export default new VueRouter({
  routes: [{
      path: '/',
      name: 'main',
      component: Container,
      props: true
    },
    {
      path: '/task/create',
      name: 'task-create',
      component: CreateTask,
      props: true
    },
    {
      path: '/c/home',
      name: 'c/home',
      component: CHome,
      props: true
    },
    {
      path: '/tasks/my',
      name: 'my-tasks',
      component: MyTasks,
      props: true
    }
  ],
  mode: 'history'
})