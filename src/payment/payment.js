/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import CustomerHeader from '../components/customer-header.vue';
import $ from "jquery";
import axios from 'axios';
import VueRouter from 'vue-router';
import LoadScript from 'vue-plugin-load-script';

import { refreshToken } from '../store.js';

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
            oWidgetSettings: {
                element: "",
                widget: null,
                destination: "",
                amount: null
            }
        }
    },    

    mounted() {
        Vue.loadScript(this.oData.loadScriptPayment)
            .then((response) => {
                this._initWidget();

                setTimeout(() => {
                    let widget = new ArsenalpayWidget();
                    widget.element = this.oWidgetSettings.element;
                    widget.widget = this.oWidgetSettings.widget;
                    widget.destination = this.oWidgetSettings.destination;
                    widget.amount = this.oWidgetSettings.amount;
                    widget.render(); // Отрисует виджет.
                }, 100);
            })

            .catch((ex) => {
                throw new Error(ex);
            });
    },

    methods: {
        // Функция подгружает настройки виджета оплаты.
        _initWidget() {
            let sUrl = this.oData.urlApi.concat("/payment/init");

            try {
                axios.post(sUrl)
                    .then((response) => {
                        this.oWidgetSettings.element = response.data.element;
                        this.oWidgetSettings.widget = response.data.widget;
                        this.oWidgetSettings.destination = response.data.destination;
                        this.oWidgetSettings.amount = response.data.amount;
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