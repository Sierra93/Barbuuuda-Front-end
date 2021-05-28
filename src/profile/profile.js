/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import CustomerHeader from '../components/customer-header.vue';
import $ from "jquery";
import axios from 'axios';

$(function () {    
    // TODO: Переделать на другой способ глобального хранения! 
    __VUE_HOT_MAP__.refreshToken();
});

export default {
    name: 'profile',
    components: {
        CustomerHeader
    },
    props: ['oData'],
    created() {
        
    },
    data() {
        return {
            checked: null
        }
    },    
    methods: {
       
    }
}