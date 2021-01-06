/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import NavMenu from '../components/nav-menu.vue';
import MyTasks from '../components/my-tasks.vue';
import $ from "jquery";
import VueRouter from 'vue-router';
import axios from 'axios';

export default {
    name: 'my-tasks',
    components: {
        NavMenu,
        VueRouter,
        MyTasks
    },
    created() {
     
    },
    data() {
        return {
            
         }
    },    
    props: ['oData'],
    methods: {
            
    }
}