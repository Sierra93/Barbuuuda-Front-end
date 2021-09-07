import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {Router} from '@angular/router';
import { API_URL } from "src/app/core/core-urls/api-url";
import * as $ from 'jquery';

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})

export class LoginModule implements OnInit {
    sPassword: string = "";

    constructor(private http: HttpClient, private router: Router) { }

    public async ngOnInit() { };

    // Функция авторизует пользователя.
    public async onLogin() {
        let params = {
            UserName: $("#idEma").val(),
            UserPassword: this.sPassword
        };

        try {
            await this.http.post(API_URL.apiUrl.concat("/user/login"), params)
              .subscribe({
                next: (response: any) => {
                    if (response.userToken) {
                        sessionStorage["userToken"] = response.userToken;
                        sessionStorage["role"] = response.role;
                        sessionStorage["user"] = response.user;

                        // this.router.navigate(["/home"]);
                        window.location.href = window.location.href.replace("/login", "/home");
                    }
                },
      
                error: (err) => {
                  throw new Error(err);
                }
              });
          }
      
          catch (e: any) {
            throw new Error(e);
          }
    }
}