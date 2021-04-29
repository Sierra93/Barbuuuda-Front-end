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

var _calendar = _interopRequireDefault(require("v-calendar/lib/components/calendar.umd"));

var _datePicker = _interopRequireDefault(require("v-calendar/lib/components/date-picker.umd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
// eslint-disable-next-line no-unused-vars
(0, _jquery["default"])(function () {
  __VUE_HOT_MAP__.refreshToken();
});
var _default = {
  name: 'view-task',
  components: {
    NavMenu: _navMenu["default"],
    VueRouter: _vueRouter["default"],
    Calendar: _calendar["default"],
    DatePicker: _datePicker["default"]
  },
  created: function created() {
    this._loadingResponds();

    this._loadingDialogs();
  },
  data: function data() {
    return {
      picker: new Date(),
      price: null,
      comment: "",
      aResponds: [],
      isRespond: false,
      bOpen: false,
      respondCount: null,
      aDialogs: [],
      statusArea: "",
      aMessages: [],
      dialogId: null
    };
  },
  props: ["oData", "oEditTask"],
  methods: {
    getImgUrl: function getImgUrl(img) {
      if (img !== null) {
        return require('../assets/images/' + img);
      }
    },
    // Функция переходит к изменению задания.
    onEditTask: function onEditTask() {
      this.oEditTask.editTask.bEdit = true;
      this.$router.push("/task/create");
    },
    // Функция покажет модалку об удалении задания.
    onShowDeleteModal: function onShowDeleteModal() {
      (0, _jquery["default"])('#idAcceptDeleteTask').modal('show');
    },
    // Функция покажет модалку ставки к заданию.
    onShowRespondModal: function onShowRespondModal() {
      if (sessionStorage["role"] == "E") {
        this._checkRespond();

        if (this.isRespond) {
          (0, _jquery["default"])('#idRespond').modal('show');
          return;
        }

        return;
      }
    },
    // Функция удаляет задание.
    OnDeleteTask: function OnDeleteTask() {
      var _this = this;

      var taskId = this.oEditTask.editTask[0].taskId;
      var sUrl = this.oData.urlApi.concat("/task/delete/".concat(taskId));

      try {
        _axios["default"].get(sUrl).then(function (response) {
          _this.$router.push("/tasks/my");
        })["catch"](function (XMLHttpRequest) {
          throw new Error('Ошибка удаления', XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    // Функция оставляет ставку к заданию.
    onRespond: function onRespond(price, comment) {
      var _this2 = this;

      var sUrl = this.oData.urlApi.concat("/executor/respond/");
      var oRespond = {
        Price: price,
        Comment: comment,
        TaskId: this.oData.oViewTaskId
      };

      try {
        _axios["default"].post(sUrl, oRespond).then(function (response) {
          console.log("Ставка к заданию сделана");

          _this2._loadingResponds();
        })["catch"](function (XMLHttpRequest) {
          throw new Error('Ошибка оставления ставки к заданию', XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    // Функция получит список ставок к заданию.
    _loadingResponds: function _loadingResponds() {
      var _this3 = this;

      var sUrl = this.oData.urlApi.concat("/task/get-responds");

      try {
        _axios["default"].post(sUrl, {
          TaskId: this.oData.oViewTaskId
        }).then(function (response) {
          console.log("Список ставок к заданию", response.data);
          _this3.aResponds = response.data.responds;
          _this3.respondCount = response.data.count;
        })["catch"](function (XMLHttpRequest) {
          throw new Error('Ошибка получения ставок к заданию', XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    // Функция проверит, делал ли уже ставку текущий исполнитель.
    _checkRespond: function _checkRespond() {
      var _this4 = this;

      var sUrl = this.oData.urlApi.concat("/executor/check-respond");

      try {
        _axios["default"].post(sUrl, {
          TaskId: this.oData.oViewTaskId
        }).then(function (response) {
          _this4.isRespond = response.data;
          console.log(_this4.isRespond);
        })["catch"](function (XMLHttpRequest) {
          throw new Error(XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    // Функция разрешит или запретит нажатие кнопки "СДЕЛАТЬ СТАВКУ".
    onTogglebRespondsOpen: function onTogglebRespondsOpen(e) {
      var isOpen = (0, _jquery["default"])("#idOpen").prop("open");

      if (!isOpen) {
        this.bOpen = true;
        return;
      }

      this.bOpen = false;
    },
    // Функция подгружает список диалогов чата.
    _loadingDialogs: function _loadingDialogs() {
      var _this5 = this;

      var sUrl = this.oData.urlApi.concat("/chat/dialogs");

      try {
        _axios["default"].post(sUrl).then(function (response) {
          _this5.aDialogs = response.data.dialogs;
          console.log("Список диалогов", _this5.aDialogs);

          _this5._openEmptyDialogArea();
        })["catch"](function (XMLHttpRequest) {
          throw new Error("Ошибка списка диалогов", XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    // Функция откроет пустую область чата.
    _openEmptyDialogArea: function _openEmptyDialogArea() {
      var _this6 = this;

      var sUrl = this.oData.urlApi.concat("/chat/dialog");

      try {
        _axios["default"].post(sUrl, {
          DialogId: null
        }).then(function (response) {
          _this6.statusArea = response.data.dialogState;
          console.log("Пустая область чата открыта", _this6.statusArea);
        })["catch"](function (XMLHttpRequest) {
          throw new Error("Ошибка открытия пустой области чата", XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    // Функция получит список сообщений диалога.
    onGetDialogMessages: function onGetDialogMessages(dialogId) {
      var _this7 = this;

      var sUrl = this.oData.urlApi.concat("/chat/dialog");

      try {
        _axios["default"].post(sUrl, {
          DialogId: this.dialogId
        }).then(function (response) {
          _this7.aMessages = response.data.messages;
          console.log("Список сообщений диалога c Id: " + dialogId, response.data);
          _this7.statusArea = response.data.dialogState;
        })["catch"](function (XMLHttpRequest) {
          throw new Error("Ошибка сообщений диалога", XMLHttpRequest.response.data);
        });
      } catch (ex) {
        throw new Error(ex);
      }
    },
    // Функция отправит сообщение.
    onSend: function onSend() {
      var sUrl = this.oData.urlApi.concat("/chat/send"); // try {
      //     axios.post(sUrl, { DialogId: dialogId })
      //         .then((response) => {
      //             this.aMessages = response.data.messages;
      //             console.log("Список сообщений диалога c Id: " + dialogId, response.data);
      //             this.statusArea = response.data.dialogState
      //         })
      //         .catch((XMLHttpRequest) => {
      //             throw new Error("Ошибка сообщений диалога", XMLHttpRequest.response.data);
      //         });
      // } 
      // catch (ex) {
      //     throw new Error(ex);
      // }
    }
  }
};
exports["default"] = _default;