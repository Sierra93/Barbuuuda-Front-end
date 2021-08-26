/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import NavMenu from '../components/nav-menu.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import $ from "jquery";

import { refreshToken } from '../store.js';

// $(function () {    
//     // TODO: Переделать на другой способ глобального хранения! 
//     __VUE_HOT_MAP__.refreshToken();
// });

export default {
    name: 'contact',
    components: {
        NavMenu,
        VueRouter
    },
    created() {
       this._loadContacts();
       refreshToken();
    },
    data() {
        return {
            oContact: {}
         }
    },    
    props: ["oData"],
    methods: {       
        // Функция получит контактную информацию.
        _loadContacts() {
            let sUrl = this.oData.urlApi.concat("/main/contacts");

            try {
                axios.post(sUrl)
                    .then((response) => {
                        this.oContact = response.data;  
                        console.log("Контакты", this.oContact);                      
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