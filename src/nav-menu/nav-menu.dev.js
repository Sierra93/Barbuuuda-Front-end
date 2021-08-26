"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _navMenu = _interopRequireDefault(require("../components/nav-menu.vue"));

var _jquery = _interopRequireDefault(require("jquery"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
// eslint-disable-next-line no-unused-vars
(0, _jquery["default"])(function () {
  __VUE_HOT_MAP__.refreshToken();
});
var _default = {
  name: 'nav-menu',
  components: {
    NavMenu: _navMenu["default"],
    VueRouter: _vueRouter["default"]
  },
  created: function created() {
    this._getAuthorize();

    this._initHeader();
  },
  data: function data() {
    return {};
  },
  props: ['oData'],
  methods: {
    // Функция проставит хидер в зависимости от роли юзера.
    _initHeader: function _initHeader() {
      if (this.$route.name == "main" || this.$route.name == "login" || this.$route.name == "register") {
        this.oData.bCustomer = false;
        this.oData.bExecutor = false;
        this.oData.bGuest = true;
      }

      if (this.$route.name == "task-create" && this.oData.bCustomer) {
        this.oData.bGuest = false;
        this.oData.bExecutor = false;
      }

      if (this.$route.name == "categories" && this.oData.bCustomer) {
        this.oData.bGuest = false;
        this.oData.bExecutor = false;
      }

      if (this.$route.name == "auction" && this.oData.bCustomer) {
        this.oData.bGuest = false;
        this.oData.bExecutor = false;
      }

      if (this.$route.name == "auction" && this.oData.bExecutor) {
        this.oData.bGuest = false;
        this.oData.bCustomer = false;
        this.oData.bExecutor = true;
      }

      if (this.$route.name == "task-create" && this.oData.bExecutor) {
        this.oData.bGuest = false;
        this.oData.bCustomer = false;
        this.oData.bExecutor = true;
      }

      if (this.$route.name == "e-home") {
        this.oData.bGuest = false;
        this.oData.bCustomer = false;
        this.oData.bExecutor = true;
      }
    },
    // Функция проверяет авторизован ли юзер. 
    _getAuthorize: function _getAuthorize() {
      var _this = this;

      var userRole = "";

      if (!sessionStorage["userToken"]) {
        this.$router.push("/");
      }

      if (!sessionStorage["userToken"] || !sessionStorage["role"]) {
        userRole = "G";
        sessionStorage["role"] = userRole;
        this.bGuest = true;
      }

      if (sessionStorage["role"] == "G") {
        userRole = "G";
        sessionStorage["role"] = userRole;
        this.bGuest = true;
        return;
      } else {
        userRole = sessionStorage["role"];
        this.bGuest = false;
      } // Формирует поля хидера для гостя.


      var sUrl = this.oData.urlApi.concat("/user/authorize?userName=".concat(sessionStorage["user"]));

      try {
        _axios["default"].get(sUrl).then(function (response) {
          response.data.aHeaderFields.forEach(function (el) {
            _this.oData.aHeader.push(el.headerField);
          });
          console.log("Хидер юзера", _this.oData.aHeader);
        }) // Токен протух, получить новый.
        ["catch"](function (XMLHttpRequest) {
          if (sessionStorage["user"] !== undefined && sessionStorage["user"] !== "") {
            var sTokenUrl = _this.oData.urlApi.concat("/user/authorize?userName=").concat(sessionStorage["user"]);

            _axios["default"].get(sTokenUrl).then(function (response) {
              sessionStorage["userToken"] = response.data;
            });
          } // Удалит токен юзера. Теперь нужно снова авторизоваться.
          else {
              sessionStorage.clear();
            }
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    // Функция отображает/скрывает левую панель.
    onStateLeftPanel: function onStateLeftPanel() {
      this.bHideLeftPanel = (0, _jquery["default"])(".left-menu").hasClass("left-panel");
      this.bHideLeftPanel ? (0, _jquery["default"])(".left-menu").removeClass("left-panel").addClass("left-panel-not-left") : (0, _jquery["default"])(".left-menu").removeClass("left-panel-not-left").addClass("left-panel");
    },
    onRouteCreateTask: function onRouteCreateTask() {
      // Если нет роли заказчик, то будет ошибка.
      if (sessionStorage["role"] !== "C") {
        (0, _jquery["default"])('#idNotCustomer').modal('show');
        return;
      }

      this.$router.push("/task/create");
    }
  }
};
exports["default"] = _default;