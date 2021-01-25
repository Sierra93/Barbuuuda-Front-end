import VueRouter from 'vue-router'
import Container from './components/container.vue';
// import NavMenu from './components/nav-menu.vue';
import CreateTask from './components/create-task.vue';
import CHome from './components/home.vue';
import MyTasks from './components/my-tasks.vue';
import ProfileBar from './components/profile-bar.vue';
import TaskView from './components/view-task.vue';
import Categories from './components/categories.vue';
import Auction from './components/auction.vue';
import Profile from './components/profile.vue';
import CProfile from './components/c-profile.vue';

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
    },
    {
      path: '/profile-bar',
      name: 'profile-bar',
      component: ProfileBar,
      props: true
    },
    {
      path: '/task/view/:taskId',
      name: 'view-task',
      component: TaskView,
      props: true
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories,
      props: true
    },
    {
      path: '/auction',
      name: 'auction',
      component: Auction,
      props: true
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      props: true
    },
    {
      path: '/c/profile',
      name: 'c-profile',
      component: CProfile,
      props: true
    }
  ],
  mode: 'history'
})