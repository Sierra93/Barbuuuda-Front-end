import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "auction",
    templateUrl: "./auction.component.html",
    styleUrls: ["./auction.component.scss"]
})

export class AuctionModule implements OnInit {
    countTasks: number = 0;
    aAuctionTasks: any[] = [];
    countTotalPage: number = 0;
    sSearch: string = "";
    role: string = "";
    taskId: number = 0;

    constructor(private http: HttpClient, private commonService: CommonDataService) { }

    public async ngOnInit() {
        await this.loadAuctionTasks();
        await this.getTotalPageetPagination();
        await this.checkUserRoleAsync();
    };

    // Функция получит список заданий в аукционе.
    private async loadAuctionTasks() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/task/auction"), {})
                .subscribe({
                    next: (response: any) => {
                        this.aAuctionTasks = response.tasks;
                        this.countTasks = response.totalCount;
                        console.log("Аукцион", this.aAuctionTasks);
                    },

                    error: (err) => {
                        this.commonService.routeToStart(err);
                        throw new Error(err);
                    }
                });
        }

        catch (e) {
            throw new Error(e);
        }
    };

    // Функция получит общее кол-во страниц.
    private async getTotalPageetPagination() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/pagination/auction?pageIdx=1"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("total page pagination", response);
                        this.countTotalPage = response.pageData.totalPages;
                        this.aAuctionTasks = response.tasks;
                    },

                    error: (err) => {
                        this.commonService.routeToStart(err);
                        throw new Error(err);
                    }
                });
        }

        catch (e) {
            throw new Error(e);
        }
    };

    private async checkUserRoleAsync() {   
        await this.commonService.getUserRoleAsync().then((data: any) => {
            this.role = data.userRole;
            sessionStorage["role"] = data.userRole;
         });    
    };  

     // Функция пагинации.
    public async onGetPaginationAsync(param: any) {
        try {
            // await this.http.post(API_URL.apiUrl.concat("/pagination/auction?pageIdx=".concat(param.toString())), {})
            //     .subscribe({
            //         next: (response: any) => {
            //             console.log("filter pagination", response);
            //             this.aAuctionTasks = response.tasks;
            //         },

            //         error: (err) => {
            //             this.commonService.routeToStart(err);
            //             throw new Error(err);
            //         }
            //     });
        }

        catch (e) {
            throw new Error(e);
        }
    };

    // TODO: вынести в общий сервис
     // Функция получит выделенное задание.
    public async onGetTaskAsync() {
        try {
            let params = {
                TaskId: this.taskId
            };

            await this.http.post(API_URL.apiUrl.concat("/task/tasks-list="), params)
                .subscribe({
                    next: (response: any) => {
                        console.log("filter pagination", response);
                        this.aAuctionTasks = response.tasks;
                    },

                    error: (err) => {
                        this.commonService.routeToStart(err);
                        throw new Error(err);
                    }
                });
        }

        catch (e) {
            throw new Error(e);
        }
    };
}