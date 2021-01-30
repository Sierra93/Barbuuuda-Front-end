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
            bFemale: null,
            iDefaultScore: "400",
            bErrorScore: false
        }
    },    
    methods: {
        // Функция загружает всю информацию профиля.
        _loadingProfile() {
            let oData = this.$parent.oData;
            let userId = localStorage["userId"];
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
            let userId = localStorage["userId"];
            let sUrl = oData.urlApi.concat("/user/save-data");
            let sGender = this.bMale || this.bFemale;
            let oSaveData = {
                UserId: userId,
                FirstName: $("#idName").val(),
                LastName: $("#idFam").val(),
                Patronymic: $("#idPatr").val(),
                City: $("#idCity").val(),
                UserEmail: $("#idEmail").val(),
                Gender: sGender
            };

            axios.post(sUrl, oSaveData)
                .then((response) => {
                    console.log("Личные данные успешно сохранены");
                    localStorage["user"] = $("#idEmail").val();
                })

                .catch((XMLHttpRequest) => {
                    throw new Error(XMLHttpRequest.response.data);
                });
        },

        // Функция проставит выбранный пол.
        onSelectGender(gender) {
            if (gender == "male") {
                this.bMale = "M";
            }

            if (gender == "female") {
                this.bFemale = "F";
            }
        },

        // Функция проверяет введенную сумму.
        onCheckScore() {                      
            if (this.iDefaultScore == "") {
                this.iDefaultScore = "0";
                this.bErrorScore = true;
                return;
            }  

            if (this.iDefaultScore < "400") {                    
                this.bErrorScore = true;
                return;
            }              
            this.bErrorScore = false;
        }
    }
}