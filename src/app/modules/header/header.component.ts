import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CommonDataService } from "src/app/services/common-data.service";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: "header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})

export class HeaderModule implements OnInit {
    bHideLeftPanel = false;
    bGuest = false;
    bHideHeader = false;

    constructor(private http: HttpClient, private router: Router, private dataService: DataService, private commonService: CommonDataService) { }

    public async ngOnInit() {
        console.log("header init");
        this.bGuest = this.dataService.bGuest;
        this.bHideHeader = this.dataService.bHideHeader;

        this.InitHeader();
        this.GetUserAuthorize();
        this.commonService.refreshToken();
    };

    // Функция проставит хидер в зависимости от роли пользователя.
    private async InitHeader() {
        // Начало цепочки проверок для хидера.
        if (this.router.url === "main") {
            this.dataService.bCustomer = false;
            this.dataService.bExecutor = false;
            this.dataService.bGuest = true;
            this.ShowGuestHeader();
        }

        if (this.router.url === "task-create" && this.dataService.bCustomer) {
            this.dataService.bGuest = false;
            this.dataService.bExecutor = false;
            this.ShowGuestHeader();
        }

        if (this.router.url === "categories" && this.dataService.bCustomer) {
            this.dataService.bGuest = false;
            this.dataService.bExecutor = false;
            this.ShowGuestHeader();
        }

        if (this.router.url === "auction" && this.dataService.bCustomer) {
            this.dataService.bGuest = false;
            this.dataService.bExecutor = false;
            this.ShowGuestHeader();
        }

        if (this.router.url === "auction" && this.dataService.bExecutor) {
            this.dataService.bGuest = false;
            this.dataService.bCustomer = false;
            this.dataService.bExecutor = true;
            this.ShowGuestHeader();
        }

        if (this.router.url === "task-create" && this.dataService.bExecutor) {
            this.dataService.bGuest = false;
            this.dataService.bCustomer = false;
            this.dataService.bExecutor = true;
            this.ShowGuestHeader();
        }

        if (this.router.url === "e-home") {
            this.dataService.bGuest = false;
            this.dataService.bCustomer = false;
            this.dataService.bExecutor = true;
            this.ShowGuestHeader();
        }

        if (this.router.url === "login" || this.router.url === "register") {
            this.dataService.bExecutor = true;
            this.HideGuestHeader();
        }
        // Конец цепочки проверок для хидера.
    };

    // Функция покажет гостевой хидер.
    private ShowGuestHeader() {
        this.dataService.bHideHeader = false;
    };

    // Функция скроет гостевой хидер.
    private HideGuestHeader() {
        this.dataService.bHideHeader = true;
    };

    // Функция проверит авторизован ли пользователь. 
    private async GetUserAuthorize() {
        let userRole = "";

        if (!sessionStorage["userToken"] && this.router.url !== "public-offer"
            && this.router.url !== "register" && this.router.url !== "login") {
            this.router.navigate(["/"]);
        }

        if (!sessionStorage["userToken"] || !sessionStorage["role"]) {
            userRole = "G";
            sessionStorage["role"] = userRole;
            this.dataService.bGuest = true;
        }

        if (sessionStorage["role"] == "G") {
            userRole = "G";
            sessionStorage["role"] = userRole;
            this.dataService.bGuest = true;
            return;
        }

        else {
            userRole = sessionStorage["role"];
            this.dataService.bGuest = false;
        }

        try {
            await this.http.get(API_URL.apiUrl.concat("/user/authorize?userName=".concat(sessionStorage["user"])))
                .subscribe({
                    next: (response: any) => {
                        // Если не страница регистрации и не страница авторизации, то запишет поля хидера.               
                        if (this.router.url !== "login" && this.router.url !== "register") {
                            response.data.aHeaderFields.forEach((el: any) => {
                                this.dataService.aHeader.push(el.headerField);
                            });
                        }

                        console.log("Хидер пользователя", this.dataService.aHeader);
                    },

                    // Токен протух, получить новый.
                    error: async () => {
                        await this.http.get(API_URL.apiUrl.concat("/user/authorize?userName=").concat(sessionStorage["user"]))
                            .subscribe({
                                next: (response: any) => {
                                    if (sessionStorage["user"] !== undefined && sessionStorage["user"] !== "") {
                                        sessionStorage["userToken"] = response;
                                    }

                                    // Удалит токен юзера. Теперь нужно снова авторизоваться.
                                    else {
                                        sessionStorage.clear();
                                    }
                                },

                                // Токен протух, получить новый.
                                error: () => { }
                            });
                    }
                });
        }

        catch (e) {
            throw new Error(e);
        }
    };

    // Функция отобразит/скроет левую панель.
    public onStateLeftPanel() {
        this.bHideLeftPanel = $(".left-menu").hasClass("left-panel");
        this.bHideLeftPanel ? $(".left-menu").removeClass("left-panel").addClass("left-panel-not-left") 
        : $(".left-menu").removeClass("left-panel-not-left").addClass("left-panel");
    };

    public onRouteCreateTask() {
        // Если нет роли заказчик, то будет ошибка.
        if (sessionStorage["role"] !== "C") {
            $('#idNotCustomer').modal('show');
            return;
        }

        this.router.navigate(["/task/create"]);
    };
}