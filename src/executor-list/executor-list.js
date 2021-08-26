/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import CustomerHeader from '../components/customer-header.vue';
import $ from "jquery";
import axios from 'axios';
import VueRouter from 'vue-router';

import { refreshToken } from '../store.js';

// $(function () {    
//     // TODO: Переделать на другой способ глобального хранения! 
//     __VUE_HOT_MAP__.refreshToken();
// });

export default {
    name: 'customer-header',
    components: {
        CustomerHeader,
        VueRouter
    },
    props: ["oData", "oEditTask"],
    data() {
        return {
            aExecutors: []
        }
    },
    created() {
        this._loadingExecutorList();
        refreshToken();
    },
    methods: {
         // Функция выгружает список исполнителей.
        _loadingExecutorList() {
            let sUrl = this.$parent.oData.urlApi.concat("/executor/list");
            
            try {
                axios.post(sUrl)
                    .then((response) => {
                        this.aExecutors = response.data;
                        console.log("Список исполнителей", this.aExecutors);
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