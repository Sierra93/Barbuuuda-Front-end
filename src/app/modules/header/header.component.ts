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

    constructor(private http: HttpClient, private router: Router, private dataService: DataService, private commonService: CommonDataService) { }

    public async ngOnInit() {
        console.log("header init");
        let bGuestRole = sessionStorage["role"] == "G" ? true : false;
        this.dataService.setGuestUserRole(bGuestRole);

        let bCustomerRole = sessionStorage["role"] == "C" ? true : false;
        this.dataService.setCustomerUserRole(bCustomerRole);

        let bExecutorRole = sessionStorage["role"] == "E" ? true : false;
        this.dataService.setExecutorUserRole(bExecutorRole);

        let role = sessionStorage["role"];
        this.dataService.setUserRole(role);  
        // this.bGuest = this.dataService.bGuest;
        this.bHideHeader = this.dataService.getHeaderStatus();               
        this.dataService.setGuestUserRole(false);
        this.InitHeader();         
        this.commonService.refreshToken();

        this.bGuest = this.dataService.getGuestUserRole();

        console.log("bHideHeader", this.bHideHeader);
        console.log("bGuest", this.dataService.getGuestUserRole());    
        console.log("bExecutor", this.dataService.getExecutorUserRole());  
        console.log("bCustomer", this.dataService.getCustomerUserRole());             
    };

    // Функция проставит хидер в зависимости от роли пользователя.
    private async InitHeader() {
        let self = this;

        this.router.events.subscribe(function (s) {
            if (s instanceof NavigationEnd) {
                // Начало цепочки проверок для хидера.
                if (s.url === "/main") {
                    self.dataService.setCustomerUserRole(false);
                    self.dataService.setExecutorUserRole(false);
                    self.dataService.setGuestUserRole(true);
                    self.dataService.setHeaderStatus(false);
                }

                if (s.url === "/task-create" && self.dataService.getCustomerUserRole()) {
                    self.dataService.setGuestUserRole(false);
                    self.dataService.setExecutorUserRole(false);
                }

                if (s.url === "/categories" && self.dataService.getCustomerUserRole()) {
                    self.dataService.setGuestUserRole(false);
                    self.dataService.setExecutorUserRole(false);
                }

                if (s.url === "/auction" && self.dataService.getCustomerUserRole()) {
                    self.dataService.setGuestUserRole(false);
                    self.dataService.setExecutorUserRole(false);
                }

                if (s.url === "/auction" && self.dataService.getExecutorUserRole()) {
                    self.dataService.setGuestUserRole(false);
                    self.dataService.setCustomerUserRole(false);
                    self.dataService.setExecutorUserRole(true);
                }

                if (s.url === "/task-create" && self.dataService.getExecutorUserRole()) {
                    self.dataService.setGuestUserRole(false);
                    self.dataService.setCustomerUserRole(false);
                    self.dataService.setExecutorUserRole(true);
                }

                if (s.url === "/home") {
                    self.dataService.setGuestUserRole(false);
                    self.dataService.setCustomerUserRole(false);
                    self.dataService.setExecutorUserRole(true);
                }

                if (s.url === "/login" || s.url === "/register") {
                    self.dataService.setExecutorUserRole(true);
                    self.dataService.setHeaderStatus(true);
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
}