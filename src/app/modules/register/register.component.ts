import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { API_URL } from "src/app/core/core-urls/api-url";

@Component({
    selector: "register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})

export class RegisterModule implements OnInit {
    role: string = "";
    bExecutor: boolean = true;
    bCustomer: boolean = false;    

    constructor(private http: HttpClient,
        private titleService: Title) { }

    public async ngOnInit() { 
        this.titleService.setTitle("Barbuuuda: Регистрация");
    };

     // Функция изменит текст описания заказчика и исполнителя.
     public onChangeTab(evt: any, type: string) {
         if (type == "executor") {
            this.bCustomer = false;
            this.bExecutor = true;
        }

        if (type == "customer") {
            this.bCustomer = true;
            this.bExecutor = false;
        }

        // var i, tabcontent, tablinks;

        // if (type == "login") {
        //     $(".tab-role").removeClass("role-show");
        //     $(".tab-role").addClass("role-hide");
        //     $(".register").removeClass("selected-role");
        //     $(".tab-role").addClass("not-selected-role");
        // }

        // if (type == "register") {
        //     $(".tab-role").removeClass("role-hide");
        //     $(".tab-role").addClass("role-show");
        //     $(".register").addClass("selected-role");
        // }

        // if (type == "executor") {
        //     this.role = "E";
        // }

        // if (type == "customer") {
        //     this.role = "C";
        // }

        // // Get all elements with class="tabcontent" and hide them
        // tabcontent = document.getElementsByClassName("tabcontent");

        // for (i = 0; i < tabcontent.length; i++) {
        //     // tabcontent[i].style.display = "none";
        // }

        // // Get all elements with class="tablinks" and remove the class "active"
        // tablinks = document.getElementsByClassName("tablinks");

        // for (i = 0; i < tablinks.length; i++) {
        //     tablinks[i].className = tablinks[i].className.replace(" active", "");
        // }

        // // Show the current tab, and add an "active" class to the button that opened the tab
        // // document.getElementById(type).style.display = "block";
        // evt.currentTarget.className += " active";
    };

    // Функция регистрирует пользователя.
    public async onCreate() {
        let params = {};

        if (this.role == "C") {
            params = {
                UserName: $("#idLog").val(),
                UserPassword: $("#idPass1").val(),
                Email: $("#idEma1").val(),
                UserRole: this.role
            };
        }

        else if (this.role == "E") {
            params = {
                UserName: $("#idLogin").val(),
                UserPassword: $("#idPassword").val(),
                Email: $("#idEmail").val(),
                UserRole: this.role
            };
        } 

        try {
            await this.http.post(API_URL.apiUrl.concat("/user/create"), params)
              .subscribe({
                next: (response) => {
                    console.log("Регистрация успешна", response);
                },
      
                error: (err) => {
                    throw new Error(err);
                }
              });
          }
      
          catch (e) {
            throw new Error(e);
          }
    };

    public showCustomerForm() {

    };

    public showExecutorForm() {

    };
}