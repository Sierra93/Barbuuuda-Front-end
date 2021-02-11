/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import $ from "jquery";
import VueRouter from 'vue-router';
import axios from 'axios';

export default {
    name: 'auction',
    components: {
        VueRouter
    },
    created() {
        this._loadingAuctionTasks();
    },
    data() {
        return {
            aAuctionTasks: [],
            countTasks: null
        }
    },
    props: ["oData"],
    methods: {
        _loadingAuctionTasks() {
            let sUrl = this.$parent.oData.urlApi.concat("/task/auction");

            try {
                axios.post(sUrl)
                    .then((response) => {                      
                        this.aAuctionTasks = response.data.aTasks;
                        this.countTasks = response.data.countTasks;
                        console.log("Аукцион", this.aAuctionTasks);
                    })
        
                    .catch((XMLHttpRequest) => {
                        throw new Error('Ошибка получения аукциона', XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        }        
    }
}