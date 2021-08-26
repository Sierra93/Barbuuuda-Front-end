"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _container = _interopRequireDefault(require("../components/container.vue"));

var _navMenu = _interopRequireDefault(require("../components/nav-menu.vue"));

var _footer = _interopRequireDefault(require("../components/footer.vue"));

var _createTask = _interopRequireDefault(require("../components/create-task.vue"));

var _customerHeader = _interopRequireDefault(require("../components/customer-header.vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _jquery = _interopRequireDefault(require("jquery"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Функция обновит токен через каждые 9 мин.
(0, _jquery["default"])(function () {
  setInterval(function () {
    var sUrl = "http://localhost:58822".concat("/user/token?userName=").concat(sessionStorage.user); // const sUrl = "https://barbuuuda.online".concat("/user/token?userName=").concat(sessionStorage.user);

    if (!sessionStorage.userToken) {
      clearInterval(intervalID);
      return;
    }

    refresh(sUrl);
  }, 530000); // Каждые 9 мин.
}); // Функция обновит токен.

function refresh(sUrl) {
  _jquery["default"].ajax({
    type: 'GET',
    url: sUrl,
    dataType: 'text',
    success: function success(data) {
      sessionStorage.userToken = data;
      console.log("refresh token");
    },
    error: function error(jqXHR) {
      console.log('Ошибка обновления токена');
    }
  });
}

var _default = {
  name: 'main-page',
  components: {
    Container: _container["default"],
    NavMenu: _navMenu["default"],
    Footer: _footer["default"],
    CreateTask: _createTask["default"],
    CustomerHeader: _customerHeader["default"]
  },
  created: function created() {
    // Автоматически добавит любым запросам токен для авторизации.
    _axios["default"].defaults.headers.common = {
      "Authorization": "Bearer ".concat(sessionStorage["userToken"])
    };
    this.utils.deadlineSession();

    this._loadDataFon();

    this._loadDataWhy();

    this._loadGetWork();

    this._loadAdvantages();

    this._loadPriveleges();

    this.oData.bGuest = sessionStorage["role"] == "G" ? true : false;
    this.oData.bCustomer = sessionStorage["role"] == "C" ? true : false;
    this.oData.bExecutor = sessionStorage["role"] == "E" ? true : false;
    this.oData.role = sessionStorage["role"]; // Функция обновит токен через каждые 9 мин.

    __VUE_HOT_MAP__.refreshToken = function () {
      setInterval(function () {
        var sUrl = "http://localhost:58822".concat("/user/token?userName=").concat(sessionStorage.user); // const sUrl = "https://barbuuuda.online".concat("/user/token?userName=").concat(sessionStorage.user);

        if (!sessionStorage.userToken) {
          clearInterval(intervalID);
          return;
        }

        refresh(sUrl);
      }, 530000); // Каждые 9 мин.
    }, function refresh(sUrl) {
      _jquery["default"].ajax({
        type: 'GET',
        url: sUrl,
        // data: {query: 'test'}, 
        dataType: 'text',
        success: function success(data) {
          sessionStorage.userToken = data;
          console.log("refresh token");
        },
        error: function error(jqXHR) {
          console.log('Ошибка обновления токена');
        }
      });
    };
  },
  data: function data() {
    var _oData;

    return {
      oData: (_oData = {
        urlApi: "http://localhost:58822",
        // urlApi: "https://barbuuuda.online",
        aHeader: [],
        bGuest: false,
        bCustomer: false,
        bExecutor: false,
        aCalendarTasks: [],
        aTasks: [],
        aCustomerTasks: [],
        aLastTasks: [],
        countTotalTask: null,
        countAuctionTask: null
      }, _defineProperty(_oData, "countAuctionTask", null), _defineProperty(_oData, "countWorkTask", null), _defineProperty(_oData, "countGarantTask", null), _defineProperty(_oData, "countCompleteTask", null), _defineProperty(_oData, "countPerechetTask", null), _defineProperty(_oData, "countDraftTask", null), _defineProperty(_oData, "countTotalPage", null), _defineProperty(_oData, "role", null), _defineProperty(_oData, "oTaskStatus", {
        Total: "Всего",
        Auction: "В аукционе",
        Work: "В работе",
        Garant: "На гарантии",
        Complete: "Завершено",
        Perechet: "Перерасчет",
        Draft: "В черновике"
      }), _defineProperty(_oData, "aCategories", []), _defineProperty(_oData, "dateRegister", null), _defineProperty(_oData, "oViewTaskId", null), _oData),
      oEditTask: {
        editTask: {},
        sTypes: {
          All: "All",
          Single: "Single"
        },
        bEdit: false
      },
      aFon: [],
      aWhyis: [],
      aWork: [],
      aAdvantages: [],
      aProveliges: [],
      sPassword: null
    };
  },
  methods: {
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
    // Функция авторизует юзера.
    onLogin: function onLogin() {
      var sUrl = this.oData.urlApi.concat("/user/login");

      try {
        _axios["default"].post(sUrl, {
          UserEmail: (0, _jquery["default"])("#idEma").val(),
          UserPassword: this.pass
        }).then(function (response) {
          sessionStorage["user"] = response.data.sLogin;
          (0, _jquery["default"])(".right-panel").hide();
        })["catch"](function (XMLHttpRequest) {
          throw new Error('Ошибка регистрации', XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    selectDate: function selectDate(date) {
      var _this6 = this;

      var formatDate = date.toLocaleString();
      var sUrl = this.$parent.oData.urlApi.concat("/task/concretely-date?date=".concat(formatDate));

      try {
        _axios["default"].get(sUrl).then(function (response) {
          _this6.$parent.oData.aTasks = response.data;
          console.log("Задания выбранной даты", _this6.$parent.oData.aTasks);
        })["catch"](function (XMLHttpRequest) {
          throw new Error('Ошибка получения заданий выбранной даты', XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    }
  }
};
exports["default"] = _default;