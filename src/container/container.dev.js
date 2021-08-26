"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _container = _interopRequireDefault(require("../components/container.vue"));

var _navMenu = _interopRequireDefault(require("../components/nav-menu.vue"));

var _footer = _interopRequireDefault(require("../components/footer.vue"));

var _createTask = _interopRequireDefault(require("../components/create-task.vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _jquery = _interopRequireDefault(require("jquery"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
// eslint-disable-next-line no-unused-vars
var _default = {
  name: 'container',
  components: {
    Container: _container["default"],
    NavMenu: _navMenu["default"],
    Footer: _footer["default"],
    CreateTask: _createTask["default"]
  },
  props: ['oData'],
  data: function data() {
    return {
      aFon: [],
      aWhyis: [],
      aWork: [],
      aAdvantages: [],
      aProveliges: [],
      sPassword: null,
      aHope: [],
      role: null
    };
  },
  created: function created() {
    this._loadDataFon();

    this._loadDataWhy();

    this._loadGetWork();

    this._loadAdvantages();

    this._loadPriveleges();

    this._loadingCategoryList(); // this.setSelectedRole();


    this._loadHope();

    this._loadingLastTasks();
  },
  methods: {
    getImgUrl: function getImgUrl(pic) {
      if (pic !== null) {
        return require('../assets/images/' + pic);
      }
    },
    // Функция выгружает данные для фона.
    _loadDataFon: function _loadDataFon() {
      var _this = this;

      var sUrl = this.oData.urlApi.concat("/main/get-fon");

      try {
        _axios["default"].post(sUrl).then(function (response) {
          _this.aFon.push(response.data);

          console.log("Данные фона", _this.aFon);
        })["catch"](function (XMLHttpRequest) {
          throw new Error('Ошибка получения данных фона', XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    // Функция выгружает данные для блока "Почему".
    _loadDataWhy: function _loadDataWhy() {
      var _this2 = this;

      var sUrl = this.oData.urlApi.concat("/main/get-why");

      try {
        _axios["default"].post(sUrl).then(function (response) {
          _this2.aWhyis = response.data;
          console.log("Данные почему", _this2.aWhyis);
        })["catch"](function (XMLHttpRequest) {
          throw new Error('Ошибка получения данных почему', XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    // Функция выгружает данные для блока "Как это работает".
    _loadGetWork: function _loadGetWork() {
      var _this3 = this;

      var sUrl = this.oData.urlApi.concat("/main/get-work");

      try {
        _axios["default"].post(sUrl).then(function (response) {
          _this3.aWork = response.data;
          console.log("Данные как это работает", _this3.aWork);
        })["catch"](function (XMLHttpRequest) {
          throw new Error('Ошибка получения данных как это работает', XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    // Функция выгружает данные для блока "Наши преимущества".
    _loadAdvantages: function _loadAdvantages() {
      var _this4 = this;

      var sUrl = this.oData.urlApi.concat("/main/get-advantage");

      try {
        _axios["default"].post(sUrl).then(function (response) {
          _this4.aAdvantages = response.data;
          console.log("Данные преимущества", _this4.aAdvantages);
        })["catch"](function (XMLHttpRequest) {
          throw new Error('Ошибка получения данных преимущества', XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    onChangeTab: function onChangeTab(evt, type) {
      var i, tabcontent, tablinks;

      if (type == "login") {
        (0, _jquery["default"])(".tab-role").removeClass("role-show");
        (0, _jquery["default"])(".tab-role").addClass("role-hide");
        (0, _jquery["default"])(".register").removeClass("selected-role");
        (0, _jquery["default"])(".tab-role").addClass("not-selected-role");
      }

      if (type == "register") {
        (0, _jquery["default"])(".tab-role").removeClass("role-hide");
        (0, _jquery["default"])(".tab-role").addClass("role-show");
        (0, _jquery["default"])(".register").addClass("selected-role");
      }

      if (type == "executor") {
        this.role = "E";
      }

      if (type == "customer") {
        this.role = "C";
      } // Get all elements with class="tabcontent" and hide them


      tabcontent = document.getElementsByClassName("tabcontent");

      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      } // Get all elements with class="tablinks" and remove the class "active"


      tablinks = document.getElementsByClassName("tablinks");

      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      } // Show the current tab, and add an "active" class to the button that opened the tab


      document.getElementById(type).style.display = "block";
      evt.currentTarget.className += " active";
    },
    // Проставит по дефолту выделенный таб.
    setSelectedRole: function setSelectedRole() {
      document.getElementById("defaultOpen").click();
    },
    // Функция выгружает данные для блока "Наши преимущества".
    _loadPriveleges: function _loadPriveleges() {
      var _this5 = this;

      var sUrl = this.oData.urlApi.concat("/main/get-privilege");

      try {
        _axios["default"].post(sUrl).then(function (response) {
          _this5.aProveliges = response.data;
          console.log("Данные привелегий", _this5.aProveliges);
        })["catch"](function (XMLHttpRequest) {
          throw new Error('Ошибка получения данных привелегий', XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    // Функция регистрирует юзера.
    onCreate: function onCreate() {
      var sUrl = this.oData.urlApi.concat("/user/create");
      var oData = {
        UserName: (0, _jquery["default"])("#idLogin").val(),
        UserPassword: (0, _jquery["default"])("#idPassword").val(),
        Email: (0, _jquery["default"])("#idEmail").val(),
        UserRole: this.role
      };

      try {
        _axios["default"].post(sUrl, oData).then(function (response) {
          console.log("Регистрация успешна", response);
        })["catch"](function (XMLHttpRequest) {
          throw new Error('Ошибка регистрации', XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error("Неожиданная ошибка", ex);
      }
    },
    // Функция авторизует юзера.
    onLogin: function onLogin() {
      var sUrl = this.oData.urlApi.concat("/user/login");
      var oData = {
        UserName: (0, _jquery["default"])("#idEma").val(),
        UserPassword: this.sPassword
      };

      try {
        _axios["default"].post(sUrl, oData).then(function (response) {
          // Если токен есть, то в зависимости от роли распределяет по интерфейсам.
          if (response.data.userToken) {
            sessionStorage["userToken"] = response.data.userToken;
            sessionStorage["role"] = response.data.role;
            sessionStorage["user"] = response.data.user;
            (0, _jquery["default"])(".right-panel").hide(); // this.$router.push("/home");

            window.location.href = window.location.href.concat("home");
          }
        })["catch"](function (XMLHttpRequest) {
          throw new Error('Ошибка авторизации', XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    onRouteCreateTask: function onRouteCreateTask() {
      // Если нет роли заказчик, то будет ошибка.
      if (sessionStorage["role"] !== "C") {
        (0, _jquery["default"])('#idNotCustomer').modal('show');
        return;
      }

      this.$router.push("/task/create");
    },
    // Функция выгружает список категорий заданий.
    _loadingCategoryList: function _loadingCategoryList() {
      var _this6 = this;

      var sUrl = this.$parent.oData.urlApi.concat("/main/category-list");
      this.utils.getTaskCategories(sUrl);
      setTimeout(function () {
        _this6.$parent.oData.aCategories = window.aTaskCategories; // this.$parent.oData.aCategories.map(el => {
        //     // el.url = require(el.url);
        //     // this.images.push(el.url);
        //     // console.log("arr", this.images);
        //     return require(el.url);
        // });
      }, 1000);
    },
    // Функция выгружает данные долгосрочного сотрудничества.
    _loadHope: function _loadHope() {
      var _this7 = this;

      var sUrl = this.$parent.oData.urlApi.concat("/main/get-hope");

      try {
        _axios["default"].get(sUrl).then(function (response) {
          _this7.aHope.push(response.data);

          console.log("Данные сотрудничества", _this7.aHope);
        })["catch"](function (XMLHttpRequest) {
          throw new Error(XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    // Функция выгружает список последних заданий 5 шт., не важно, чьи они.
    _loadingLastTasks: function _loadingLastTasks() {
      var _this8 = this;

      var sUrl = this.$parent.oData.urlApi.concat("/main/last");

      try {
        _axios["default"].get(sUrl).then(function (response) {
          _this8.oData.aLastTasks = response.data;
          console.log("Последние задания", _this8.oData.aLastTasks);
        })["catch"](function (XMLHttpRequest) {
          throw new Error(XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    onRouteExecutors: function onRouteExecutors() {
      this.$router.push("/executors-list");
    },
    ontest: function ontest() {
      var sUrl = this.$parent.oData.urlApi.concat("/executor/add-spec");
      var oSaveData = {
        "Specializations": [{
          "SpecName": "Специализация1"
        }, {
          "SpecName": "Специализация2"
        }]
      };

      _axios["default"].post(sUrl, oSaveData).then(function (response) {})["catch"](function (XMLHttpRequest) {
        throw new Error(XMLHttpRequest.response.data);
      });
    }
  }
};
exports["default"] = _default;