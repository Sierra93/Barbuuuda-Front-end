/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import $ from "jquery";
import VueRouter from 'vue-router';
import axios from 'axios';

$(function () {    
    __VUE_HOT_MAP__.refreshToken();
});

export default {
    name: 'categories',
    components: {
        VueRouter
    },
    created() {
        this._loadingCategoryList();
    },
    data() {
        return {
            
        }
    },
    props: ["oData"],
    methods: {
        // Функция выгружает список категорий заданий.
        _loadingCategoryList() {
            let sUrl = this.$parent.oData.urlApi.concat("/main/category-list");
            this.utils.getTaskCategories(sUrl);
            this.$parent.oData.aCategories = window.aTaskCategories;
        }       
    }
}