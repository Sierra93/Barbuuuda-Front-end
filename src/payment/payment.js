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
        Vue.loadScript(this.oData.loadScriptPayPal)
        .then(() => {
            // Настройки кнопок и их функции.
            // Названия функций менять нельзя! Они определены в SDK PayPal!
            paypal.Buttons({
                // style: {
                //     layout:  'vertical',
                //     color:   'blue',
                //     shape:   'rect',
                //     label:   'paypal'
                //   }
                commit: false,
                payment: function (data, actions) {
                    return actions.payment.create({
                        payment: {
                            transactions: [{
                                amount: {
                                    total: '100',
                                    currency: 'RUB'
                                }
                            }]
                        },
                        experience: {
                            input_fields: {
                                no_shipping: 1
                            }
                        }
                    });
                },
    
                // Функция установит детали транзакции включая сумму и позицию. 
                // Срабатывает при нажатии на кнопку PayPal либо карты.
                createOrder: function(data, actions) {
                    context.onCreateOrder();
                  },

                  // Функция соберет средства от транзакции.
                  onApprove: function(data, actions) {
                    return actions.order.capture()
                    .then(function(details) {
                    });
                  }
            }).render('.pay_pal');
        })
        .catch((ex) => {
            console.log(ex);
        });
    },
    methods: {
        onCreateOrder() {
            let sUrl = this.oData.urlApi.concat("/payment/create-order");
            
            try {
                axios.post(sUrl)
                    .then((response) => {
                        console.log(response.data);
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