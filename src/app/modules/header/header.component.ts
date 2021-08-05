import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
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
    aHeader: any[] = [];
    role: string = "";
    balance: string = "";
    bShowGuestHeader: boolean = false;
    bStart: boolean = false;    

    constructor(private http: HttpClient, private router: Router, private dataService: DataService, private commonService: CommonDataService) { }

    public async ngOnInit() {
        console.log("header init");       
        this.initHeader();         
        this.commonService.refreshToken();
        await this.checkUserRoleAsync();
        await this.commonService.GetBalanceAsync();     
        console.log("bShowGuestHeader", this.bShowGuestHeader);
        await this.GetBalanceAsync();
    };

    // Функция проставит хидер в зависимости от роли пользователя.
    private async initHeader() {
        let self = this;

        this.router.events.subscribe(function (s) {
            if (s instanceof NavigationEnd) {
                // Начало цепочки проверок для хидера.     
                if (s.url === "/") {
                    self.bStart = true;
                    self.bShowGuestHeader = true;
                }
                
                if (s.url === "/main") {
                    self.bShowGuestHeader = false;
                }

                if (s.url === "/task-create" && self.dataService.getCustomerUserRole()) {
                    self.bShowGuestHeader = false;
                }

                if (s.url === "/categories" && self.dataService.getCustomerUserRole()) {
                    self.bShowGuestHeader = false;
                }

                if (s.url === "/auction" && self.dataService.getCustomerUserRole()) {
                    self.bShowGuestHeader = false;
                }

                if (s.url === "/auction" && self.dataService.getExecutorUserRole()) {
                    self.bShowGuestHeader = false;
                }

                if (s.url === "/task-create" && self.dataService.getExecutorUserRole()) {
                    self.bShowGuestHeader = false;
                }

                if (s.url === "/home") {
                    self.bShowGuestHeader = false;
                }

                if (s.url === "/login" || s.url === "/register") {                    
                    self.bShowGuestHeader = true;
                }
                // Конец цепочки проверок для хидера.                
            }
        });

        // Получит поля хидера.    
        await this.commonService.getUserAuthorizeAsync().then((data: any) => {
            this.aHeader = data;            
         });         
        
        console.log("header data", this.aHeader);    
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

    public onReturnStart() {
        this.router.navigate(["/"]);
    };

    // Функция распределит по пунктам хидера.
    public onGetMenu(value: any) {
        // if (value && value == " Barbuuuda ") {
        //     this.bGuest = true;
        //     this.router.navigate(["/"]);
        // } 
        
        if (value == "Главная") {
            this.router.navigate(["/home"]);
        } 
        
        else if (value == "Мои задания") {
            this.router.navigate(["/tasks/my"]);
        } 
        
        else if (value == "Создать задание") {
            this.dataService.setIsEditTask(false);
            this.router.navigate(["/task/create"]);
        } 
        
        else if (value == "Аукцион заданий") {
            this.dataService.setIsEditTask(false);
            this.router.navigate(["/auction"]);
        }
    };

    private async checkUserRoleAsync() {   
        await this.commonService.getUserRoleAsync().then((data: any) => {
            this.role = data.userRole;
            sessionStorage["role"] = data.userRole;
         });    
    };    

    private async GetBalanceAsync() {
        // Получит баланс пользоватея на сервисе.
        await this.commonService.GetBalanceAsync().then((data: any) => {
            this.balance = data;            
         });
    };

    public onGoProfile() {
        this.router.navigate(["profile"]);
    };
}