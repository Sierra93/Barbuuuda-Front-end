/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import CustomerHeader from '../components/customer-header.vue';
import $ from "jquery";
import axios from 'axios';
import VueRouter from 'vue-router';
import LoadScript from 'vue-plugin-load-script';

import {
    refreshToken
} from '../store.js';

Vue.use(LoadScript);

let context = null;

export default {
    name: 'customer-header',
    components: {
        CustomerHeader,
        VueRouter
    },

    props: ["oData"],

    created() {
        context = this;

        refreshToken();
    },

    data() {
        return {
            // oWidgetSettings: {
            //     element: "",
            //     widget: null,
            //     destination: "",
            //     amount: null
            // }
            oWidgetSettings: {}
        }
    },

    mounted() {
        // Подгрузит платежный виджет.
        Vue.loadScript(this.oData.loadScriptPayment)
            .then((response) => {
                // Конфигурация виджета PayMaster.
                this._initWidget();

                setTimeout(() => {
                    let widget = new PayMasterWidget();                    
                    widget.mount('widget', this.oWidgetSettings);
                }, 1000);

                // TODO: заменить на данные с бэка.
                // let oWidget = {
                //     "version": "1.0",
                //     "invoice": {
                //         "description": "Тестовая услуга",
                //         "amount": "150",
                //         "merchantId": "02d2f902-e614-43d0-a0b6-2026b9923932",
                //         "taskId": 1,
                //         "account": "petya",
                //         "currency": "RUB"
                //     },
                //     "paymentForm": {
                //         "title": "Данные об оплате. Информация об оплате будет выслана на вашу почту.",
                //         "value": {
                //             "description": {
                //                 "type": "textarea",
                //                 "label": "Наименование услуги"
                //             },
                //             "amount": {
                //                 "type": "input",
                //                 "label": "Сумма оплаты",
                //                 "placeholder": "100",
                //                 "access": "readonly"
                //             },
                //             "merchantId": {
                //                 "type": "input"
                //             },
                //             "taskId": {
                //                 "type": "number",
                //                 "label": "TaskId",
                //                 "placeholder": "",
                //                 "access": "hidden"
                //             },
                //             "account": {
                //                 "type": "textarea",
                //                 "label": "Login",
                //                 "placeholder": "",
                //                 "access": "hidden"
                //             },
                //             "currency": {
                //                 "type": "textarea",
                //                 "label": "Currency",
                //                 "placeholder": "",
                //                 "access": "hidden"
                //             }
                //         }
                //     },
                //     "payment": {
                //         "title": null,
                //         "submitText": "Оплатить",
                //         "allowExternal": false,
                //         "methods": ["test"]
                //     }
                // }
                // let widget = new PayMasterWidget();
                // widget.mount('widget', oWidget);

                // TODO: Если использовать ArsenalPay.
                // Для ArsenalPay.
                // this._initWidget();

                // setTimeout(() => {
                //     var widget = new ArsenalpayWidget();
                //     widget.element = this.oWidgetSettings.element;
                //     widget.widget = this.oWidgetSettings.widget;
                //     widget.destination = this.oWidgetSettings.destination;
                //     widget.amount = this.oWidgetSettings.amount;
                //     widget.render();
                // }, 1000);
            })

            .catch((ex) => {
                throw new Error(ex);
            });
    },

    methods: {
        // Функция подгрузит настройки виджета оплаты.
        _initWidget() {
            let sUrl = this.oData.urlApi.concat("/payment/init");
            let oPayData = {
                Amount: this.oData.refillAmount
            };

            // Форматирует цену.
            let formatPrice = this.utils.replaceSpacesPrice(oPayData.Amount);
            oPayData.Amount = +formatPrice;

            try {
                axios.post(sUrl, oPayData)
                    .then((response) => {
                        // this.oWidgetSettings.element = response.data.element;
                        // this.oWidgetSettings.widget = response.data.widget;
                        // this.oWidgetSettings.destination = response.data.destination;
                        // this.oWidgetSettings.amount = response.data.amount;                        
                        this.oWidgetSettings = response.data;
                        console.log("oWidgetSettings", this.oWidgetSettings);
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error(XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        }
    }
}