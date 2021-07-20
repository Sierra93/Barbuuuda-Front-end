import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CommonDataService } from "src/app/services/common-data.service";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: "header-drop-menu",
    templateUrl: "./header-drop-menu.component.html",
    styleUrls: ["./header-drop-menu.component.scss"]
})

export class HeaderDropMenuModule implements OnInit {
    bGuest: boolean = false;
    bCreateBtn: boolean = false;
    bHideHeader: boolean = false;
    balance: string = "";
    aHeader: any[] = [];
    bExecutor = false;
    bCustomer = false;    

    constructor(private http: HttpClient, private dataService: DataService, private commonService: CommonDataService, private router: Router) { };

    public async ngOnInit() {
        this.balance = this.dataService.getUserBalance();
        this.commonService.refreshToken();
        this.GetBalanceAsync();              
    };

     // Функция распределит по пунктам хидера.
    public onGetMenu(value: any) {
        if (value && value == " Barbuuuda ") {
            this.bGuest = true;
            this.router.navigate(["/"]);
        } 
        
        else if (value == "Главная") {
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

    public onGoProfile() {
        this.router.navigate(["/profile"]);
    };

    // Фугкция получит сумму баланса пользователя.
    private async GetBalanceAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/payment/balance"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Баланс:", response);
                        this.dataService.setUserBalance(response);
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
}