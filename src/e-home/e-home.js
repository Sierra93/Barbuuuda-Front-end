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
    props: ["oData"],
    data() {
        return {
            
        }
    },
    created() {
        console.log("init e-home");
        refreshToken();
    },
    methods: {
         
    }
}