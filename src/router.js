import VueRouter from 'vue-router'
import Container from './components/container.vue';
import CreateTask from './components/create-task.vue';
import CHome from './components/home.vue';
import MyTasks from './components/my-tasks.vue';
import ProfileBar from './components/profile-bar.vue';
import TaskView from './components/view-task.vue';
import Categories from './components/categories.vue';
import Auction from './components/auction.vue';
import Profile from './components/profile.vue';
import CProfile from './components/c-profile.vue';
import ExecutorList from './components/executor-list.vue';
import EHOME from './components/e-home.vue';
import Login from './components/login.vue';
import Register from './components/register.vue';
import PublicOffer from './components/public-offer.vue';
import Payment from './components/payment.vue';

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
      props: true,
      meta: {title: 'create'}
    },
    {
      path: '/home',
      name: 'home',
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
    },
    {
      path: '/executors-list',
      name: 'executor-list',
      component: ExecutorList,
      props: true
    },
    {
      path: '/e/home',
      name: 'e-home',
      component: EHOME,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      props: true
    },
    {
      path: '/public-offer',
      name: 'public-offer',
      component: PublicOffer,
      props: true
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment,
      props: true
    }
  ],
  mode: 'history'
})