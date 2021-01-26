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
            aProfileData: [],
            bMale: null,
            bFemale: null
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
                    this.aProfileData.push(response.data);
                    oData.dateRegister = response.data.dateRegister.split(".")[0];
                    console.log("Данные профиля", this.aProfileData);
                })

                .catch((XMLHttpRequest) => {
                    throw new Error(XMLHttpRequest.response.data);
                });
        },

        // Функция сохраняет личные данные.
        onSaveData() {
            let oData = this.$parent.oData;
            let userId = +localStorage["userId"];
            let sUrl = oData.urlApi.concat("/user/save-data");
            let oSaveData = {
                UserId: userId,
                FirstName: $("#FirstName").val(),
                LastName: $("#idFam").val(),
                Patronymic: $("#idPatr").val(),
                City: $("#idCity").val(),
                UserEmail: $("#idEmail").val(),
                Gender: this.bMale || this.bFemale
            };

            axios.post(sUrl, oSaveData)
                .then((response) => {
                    console.log("Личные данные успешно сохранены");
                })

                .catch((XMLHttpRequest) => {
                    throw new Error(XMLHttpRequest.response.data);
                });
        },

        onSelectGender(gender) {
            if (gender == "male") {
                this.bMale = "M";
            }

            if (gender == "female") {
                this.bFemale = "F";
            }
        }
    }
}