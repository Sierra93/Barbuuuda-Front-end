import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { API_URL } from "src/app/core/core-urls/api-url";
import {Router} from '@angular/router';

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
            await this.http.post(API_URL.apiUrl.concat("/user/create"), params)
              .subscribe({
                next: (response: any) => {
                    if (response.userToken) {
                        sessionStorage["userToken"] = response.data.userToken;
                        sessionStorage["role"] = response.data.role;
                        sessionStorage["user"] = response.data.user;

                        this.router.navigate(["/home"]);
                    }
                },
      
                error: (err) => {
                  throw new Error(err);
                }
              });
          }
      
          catch (e) {
            throw new Error(e);
          }
    }
}