"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _router = _interopRequireDefault(require("./router"));

require("bootstrap");

require("bootstrap/dist/css/bootstrap.min.css");

require("popper.js/dist/popper.min.js");

require("bootstrap/dist/js/bootstrap.min.js");

var _jquery = _interopRequireDefault(require("jquery"));

var _container = _interopRequireDefault(require("./components/container.vue"));

var _createTask = _interopRequireDefault(require("./components/create-task.vue"));

var _home = _interopRequireDefault(require("./components/home.vue"));

var _myTasks = _interopRequireDefault(require("./components/my-tasks.vue"));

var _profileBar = _interopRequireDefault(require("./components/profile-bar.vue"));

var _calendar = _interopRequireDefault(require("v-calendar/lib/components/calendar.umd"));

var _datePicker = _interopRequireDefault(require("v-calendar/lib/components/date-picker.umd"));

var _axios = _interopRequireDefault(require("axios"));

var _categories = _interopRequireDefault(require("./components/categories.vue"));

var _auction = _interopRequireDefault(require("./components/auction.vue"));

var _cProfile = _interopRequireDefault(require("./components/c-profile.vue"));

var _executorList = _interopRequireDefault(require("./components/executor-list.vue"));

var _vueHeadful = _interopRequireDefault(require("vue-headful"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
// eslint-disable-next-line no-unused-vars
_vue["default"].use(_vueRouter["default"]);

_vue["default"].component('Container', _container["default"]);

_vue["default"].component('CreateTask', _createTask["default"]);

_vue["default"].component('CHome', _home["default"]);

_vue["default"].component('MyTasks', _myTasks["default"]);

_vue["default"].component('ProfileBar', _profileBar["default"]);

_vue["default"].component('calendar', _calendar["default"]);

_vue["default"].component('date-picker', _datePicker["default"]);

_vue["default"].component('categories', _categories["default"]);

_vue["default"].component('auction', _auction["default"]);

_vue["default"].component('CProfile', _cProfile["default"]);

_vue["default"].component('ExecutorList', _executorList["default"]);

_vue["default"].component('vue-headful', _vueHeadful["default"]); // Общие функции приложения.


var utils = {
  // Функция получает список заданий выбранной даты в календаре.
  getTasksDate: function getTasksDate(date, oData) {
    var formatDate = date.toLocaleString();
    var sUrl = oData.urlApi.concat("/task/concretely-date?date=".concat(formatDate));

    try {
      _axios["default"].get(sUrl).then(function (response) {
        window.aTasks = response.data;
      })["catch"](function (XMLHttpRequest) {
        throw new Error('Ошибка получения заданий выбранной даты', XMLHttpRequest.response.data);
      });
    } catch (ex) {
      throw new Error(ex);
    }
  },
  // Функция получает список всех категорий.
  getTaskCategories: function getTaskCategories(sUrl) {
    _axios["default"].get(sUrl).then(function (response) {
      window.aTaskCategories = response.data;
      console.log("Список категорий заданий", window.aTaskCategories);
    })["catch"](function (XMLHttpRequest) {
      throw new Error(XMLHttpRequest.response.data);
    });
  },
  // Функция отсчитывает время бездействия юзера, по окончании простоя убивает сессию и перенаправляет на стартовую для авторизации.
  deadlineSession: function deadlineSession() {
    var idleTime = 0;
    (0, _jquery["default"])(document).ready(function () {
      //Increment the idle time counter every minute.
      var idleInterval = setInterval(timerIncrement, 60000); // 1 minute
      //Zero the idle timer on mouse movement.

      (0, _jquery["default"])(this).mousemove(function (e) {
        idleTime = 0;
      });
      (0, _jquery["default"])(this).keypress(function (e) {
        idleTime = 0;
      });
    });

    function timerIncrement() {
      idleTime = idleTime + 1;

      if (idleTime > 19) {
        // 20 minutes
        sessionStorage.clear();
        localStorage.clear();
        (0, _jquery["default"])(".right-panel").show();
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
  install: function install(Vue) {
    Object.defineProperty(Vue.prototype, 'utils', {
      get: function get() {
        return utils;
      }
    });
  }
};

_vue["default"].use(utils);

new _vue["default"]({
  render: function render(h) {
    return h(_App["default"]);
  },
  router: _router["default"]
}).$mount('#app');