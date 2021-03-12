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
        this._totalPageetPagination();
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
        },
        
        // Функция пагинации.
        onGetPagination(param) {
            const sUrl = this.oData.urlApi.concat("/pagination/auction?pageIdx=".concat(+param));

            try {
                axios.post(sUrl)
                    .then((response) => {         
                        console.log("filter pagination", response.data);
                        this.aAuctionTasks = response.data.tasks;
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error(XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },

        // Функция получает общее кол-во страниц.
        _totalPageetPagination() {
            const sUrl = this.oData.urlApi.concat("/pagination/auction?pageIdx=1");

            try {
                axios.post(sUrl)
                    .then((response) => {         
                        console.log("total page pagination", response.data);
                        this.oData.countTotalPage = response.data.pageData.totalPages;
                        this.aAuctionTasks = response.data.tasks;
                    })

                    .catch((XMLHttpRequest) => {
                        throw new Error(XMLHttpRequest.response.data);
                    });
            } 
            
            catch (ex) {
                throw new Error(ex);
            }
        },
    }
}