/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import CustomerHeader from '../components/customer-header.vue';
import $ from "jquery";
import axios from 'axios';
import VueRouter from 'vue-router';
import LoadScript from 'vue-plugin-load-script';
 
Vue.use(LoadScript);
Vue.loadScript("https://www.paypal.com/sdk/js?client-id=AaT69mnC2Wl5xQ4i2vk67EscPVhnE6yNFzzwTFr8V93AVddY14Lhj29ZRyECJ_ReduhNyd6gX_AqzgR4")
.then(() => {
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
            transactions: [
              {
                amount: {
                  total: '100',
                  currency: 'RUB'
                }
              }
            ]
          },
          experience: {
            input_fields: {
              no_shipping: 1
            }
          }
        });
      }
  }).render('.pay_pal');
})
.catch(() => {
  
});

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
        
    },
    methods: {
         
    }
}