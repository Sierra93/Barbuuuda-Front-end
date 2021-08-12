import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CommonDataService } from "src/app/services/common-data.service";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: "profile-bar",
    templateUrl: "./profile-bar.component.html",
    styleUrls: ["./profile-bar.component.scss"]
})

export class ProfileBarModule implements OnInit {
    bHideCalendar = false;    
    countAuction = 0;
    countWork = 0;
    countGarant = 0;
    countComplete = 0;
    countPerechet = 0;
    countDraft = 0;
    countTotalTasks = 0;
    boundingMonth = false;
    selectedDate = new Date();
    date: Date = new Date();

    constructor(private http: HttpClient, private router: Router, private commonService: CommonDataService, private dataService: DataService) { }

    public async ngOnInit() {
        let self = this;    
        console.log("profilebar",this.dataService.testData);

        await this.loadCountTaskAsync();  
        // await this.loadTotalCountTasks();      

        this.router.events.subscribe(function (s) {
            if (s instanceof NavigationEnd) {
                if (s.url === "/profile") {                    
                    self.bHideCalendar = true;
                }         
            }
        });
     }

     // Функция получит кол-во заданий в разных статусах.
     private async loadCountTaskAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/task/count-status"), {})
                .subscribe({
                    next: (response: any) => {
                        this.countAuction = response.auction;
                        this.countWork = response.work;
                        this.countGarant = response.garant;
                        this.countComplete = response.complete;
                        this.countPerechet = response.perechet;
                        this.countDraft = response.draft;
                        this.countTotalTasks = response.total;
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
    
    public async handleDateChange(selectedDate: Date) {
        let date = selectedDate.toLocaleDateString();
    };

    // Функция выгрузит задания с определенным статусом.
    // public async onGetStatusTaskAsync(status: string) {
    //     try {
    //         await this.commonService.getUserRoleAsync().then((data: any) => {
                
    //         });
    //     }

    //     catch (e) {
    //         throw new Error(e);
    //     }
    // };
}