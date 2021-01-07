/* eslint-disable */
// eslint-disable-next-line no-unused-vars


import CustomerHeader from '../components/customer-header.vue';
import CHome from '../components/home.vue';
import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import $ from "jquery";
import axios from 'axios';

export default {
    name: 'c-home',
    components: {
        CustomerHeader,
        CHome,
        Calendar,
        DatePicker
    },
    props: ['oData'],
    created() {
        
    },
    data() {
        return {
            
        }
    },    
    methods: {
        
    }
}