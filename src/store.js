/* eslint-disable */
// eslint-disable-next-line no-unused-vars

"use strict";
import $ from "jquery";
export const apiUrlLocalConst = "http://localhost:58822";
export const apiUrlProdConst = "https://barbuuuda.online";

export function onInit() {
    console.log("init GlobalMethods start");
}

export function refreshToken() {
    _refreshToken();
}

function _refreshToken() {
    console.log("init refreshToken start");
    setInterval(function () {
        const apiUrlLocal = apiUrlLocalConst;
        const sUrl = apiUrlLocal.concat("/user/token?userName=").concat(sessionStorage.user);
        // const sUrl = apiUrlProdConst.concat("/user/token?userName=").concat(sessionStorage.user);

        if (!sessionStorage.userToken) {
            // clearInterval(intervalID);
            clearInterval();
            return;
        }
        refresh(sUrl);
    }, 530000); // Каждые 9 мин. 
}

function refresh(sUrl) {
    $.ajax({
        type: 'GET',
        url: sUrl,
        // data: {query: 'test'}, 
        dataType: 'text',
        success: function (data) {
            sessionStorage.userToken = data;
            console.log("refresh token");
        },

        error: function (jqXHR) {
            console.log('Ошибка обновления токена', jqXHR);
        }
    });
}