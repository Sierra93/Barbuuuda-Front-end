"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _container = _interopRequireDefault(require("./components/container.vue"));

var _createTask = _interopRequireDefault(require("./components/create-task.vue"));

var _home = _interopRequireDefault(require("./components/home.vue"));

var _myTasks = _interopRequireDefault(require("./components/my-tasks.vue"));

var _profileBar = _interopRequireDefault(require("./components/profile-bar.vue"));

var _viewTask = _interopRequireDefault(require("./components/view-task.vue"));

var _categories = _interopRequireDefault(require("./components/categories.vue"));

var _auction = _interopRequireDefault(require("./components/auction.vue"));

var _profile = _interopRequireDefault(require("./components/profile.vue"));

var _cProfile = _interopRequireDefault(require("./components/c-profile.vue"));

var _executorList = _interopRequireDefault(require("./components/executor-list.vue"));

var _eHome = _interopRequireDefault(require("./components/e-home.vue"));

var _login = _interopRequireDefault(require("./components/login.vue"));

var _register = _interopRequireDefault(require("./components/register.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = new _vueRouter["default"]({
  routes: [{
    path: '/',
    name: 'main',
    component: _container["default"],
    props: true
  }, {
    path: '/task/create',
    name: 'task-create',
    component: _createTask["default"],
    props: true,
    meta: {
      title: 'create'
    }
  }, {
    path: '/home',
    name: 'home',
    component: _home["default"],
    props: true
  }, {
    path: '/tasks/my',
    name: 'my-tasks',
    component: _myTasks["default"],
    props: true
  }, {
    path: '/profile-bar',
    name: 'profile-bar',
    component: _profileBar["default"],
    props: true
  }, {
    path: '/task/view/:taskId',
    name: 'view-task',
    component: _viewTask["default"],
    props: true
  }, {
    path: '/categories',
    name: 'categories',
    component: _categories["default"],
    props: true
  }, {
    path: '/auction',
    name: 'auction',
    component: _auction["default"],
    props: true
  }, {
    path: '/profile',
    name: 'profile',
    component: _profile["default"],
    props: true
  }, {
    path: '/c/profile',
    name: 'c-profile',
    component: _cProfile["default"],
    props: true
  }, {
    path: '/executors-list',
    name: 'executor-list',
    component: _executorList["default"],
    props: true
  }, {
    path: '/e/home',
    name: 'e-home',
    component: _eHome["default"],
    props: true
  }, {
    path: '/login',
    name: 'login',
    component: _login["default"],
    props: true
  }, {
    path: '/register',
    name: 'register',
    component: _register["default"],
    props: true
  }],
  mode: 'history'
});

exports["default"] = _default;