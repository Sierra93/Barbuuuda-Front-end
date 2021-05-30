/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import CustomerHeader from '../components/customer-header.vue';
import $ from "jquery";
import axios from 'axios';
import VueRouter from 'vue-router';
import LoadScript from 'vue-plugin-load-script';

Vue.use(LoadScript);

let context = null;

$(function () {
    // TODO: Переделать на другой способ глобального хранения! 
    __VUE_HOT_MAP__.refreshToken();
});

export default {
    name: 'customer-header',
    components: {
        CustomerHeader,
        VueRouter
    },

    props: ["oData"],

    data() {
        return {

        }
    },

    created() {
        context = this;
    },

    mounted() {
        // Загружает скрипт PayPal SDK.
        // Настройки кнопок и их функции.
        // Названия функций менять нельзя! Они определены в SDK PayPal!
        Vue.loadScript(this.oData.loadScriptPayPal)
            .then(() => {
                paypal.Buttons({
                    // Функция настроит детали транзакции. 
                    // Срабатывает при нажатии на кнопку PayPal либо карты.
                    createOrder: function (data, actions) {
                        let sUrl = context.oData.urlApi.concat("/payment/setup-transaction");

                        try {
                            return axios.post(sUrl)
                                .then((response) => {
                                    console.log("transaction id:", response.data.id);

                                    return response.data.id;
                                })

                                .catch((XMLHttpRequest) => {
                                    throw new Error(XMLHttpRequest.response.data);
                                });
                        } catch (ex) {
                            throw new Error(ex);
                        }
                    },

                    // Функция соберет средства от транзакции и выполнит платеж.
                    onApprove: function (data, actions) {
                        let sUrl = context.oData.urlApi.concat("/payment/capture-transaction");
                        let captureData = {
                            OrderId: data.orderID
                        };

                        try {
                            return axios.post(sUrl, captureData)
                                .then((response) => {
                                    console.log(response.data);
                                    // alert('Transaction completed by ' + details.payer.name.given_name);                         
                                })

                                .catch((XMLHttpRequest) => {
                                    throw new Error(XMLHttpRequest.response.data);
                                });
                        } catch (ex) {
                            throw new Error(ex);
                        }
                    },

                    onCancel: function (data) {
                        // Show a cancel page, or return to cart
                    },

                    onError: function (err) {
                        // For example, redirect to a specific error page
                        // window.location.href = "/your-error-page-here";
                    },

                    // onInit is called when the button first renders
                    onInit: function (data, actions) {
                        console.log("oninit");
                    },

                    // onClick is called when the button is clicked
                    onClick: function () {
                        console.log("onclick");
                    }
                }).render('.pay_pal');
            })
            .catch((ex) => {
                throw new Error(ex);
            });
    },

    methods: {

    }
}