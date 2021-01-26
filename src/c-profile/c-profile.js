/* eslint-disable */
// eslint-disable-next-line no-unused-vars

import Vue from "vue";
import CustomerHeader from '../components/customer-header.vue';
import $ from "jquery";
import axios from 'axios';

export default {
    name: 'c-profile',
    components: {
        CustomerHeader
    },
    props: ['oData'],
    created() {
        this._loadingProfile();
    },
    data() {
        return {
            aProfileData: []
        }
    },    
    methods: {
        // Функция загружает всю информацию профиля.
        _loadingProfile() {
            let oData = this.$parent.oData;
            let userId = +localStorage["userId"];
            let sUrl = oData.urlApi.concat("/user/profile?userId=".concat(userId));

            axios.post(sUrl)
                .then((response) => {
                    this.aProfileData .push(response.data);
                    console.log("Данные профиля", this.aProfileData);
                })

                .catch((XMLHttpRequest) => {
                    throw new Error(XMLHttpRequest.response.data);
                });
        }
    }
}