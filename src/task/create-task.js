/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import CreateTask from '../components/create-task.vue';
import $ from "jquery";
import axios from 'axios';

export default {
    name: 'task/create',
    components: {
        CreateTask
    },
    created() {

    },
    data() {
        return {

        }
    },    
    methods: {
        onShowTask(e) {
            console.log("onShowTask");
        }
    }
}