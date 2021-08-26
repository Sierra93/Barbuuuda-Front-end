import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CommonDataService } from "src/app/services/common-data.service";
import { PaginationInput } from "src/app/models/pagination/input/pagination-input";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

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
    viewTask: any;
    customerLogin: string = "";
    taskTitle: string = "";
    taskDetail: string = "";
    taskPrice: string = "";
    taskBegda: any;
    categoryName: string = "";
    specName: string = "";
    respondCount: number = 0;
    bSelectPay: boolean = false;
    bWorkAccept: boolean = false;
    isRespond: boolean = false;
    bNotTaskPrice: boolean = false; // TODO: доработать на наличие цены задания
    aMessages: any = [];
    message: string = "";
    statusArea: string = "";
    aResponds: any = [];
    displayModal: boolean = false;
    position: string = "";
    dialogId: number = 0;
    aDialogs: any;
    displayDeleteModal: boolean = false;
    displaySelectExecutorModal: boolean = false;
    firstName: string = "";
    lastName: string = "";
    userName: string = "";
    displayChatModal: boolean = false;
    routeParam: number;

    constructor(private http: HttpClient, 
        private commonService: CommonDataService, 
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title) {
        this.routeParam = +this.route.snapshot.queryParams.page;
        this.routeParam = +this.route.snapshot.queryParams.rows;
     }

    public async ngOnInit() {
        await this.loadAuctionTasks();
        await this.checkUserRoleAsync();
        await this.getTransitionAsync();
        await this.loadPaginationInit();

        this.titleService.setTitle("Barbuuuda: Аукцион заданий");
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

    private async getViewTaskAsync(): Promise<void> {
        await this.commonService.loadTaskListAsync("Single", this.taskId).then((data: any) => {
            this.viewTask = data;
            console.log("viewTask", this.viewTask);

            this.customerLogin = data[0].customerLogin;
            this.taskTitle = data[0].taskTitle;
            this.taskDetail = data[0].taskDetail;
            this.taskPrice = data[0].taskPrice;
            this.taskBegda = data[0].taskBegda;
            this.categoryName = data[0].categoryName;
            this.specName = data[0].specName;
        });
    };

    // Функция получит переход.
    private async getTransitionAsync(): Promise<void> {
        try {
            await this.commonService.getTransitionAsync().then((data: any) => {
                this.viewTask = data.taskId;
                this.taskId = data.taskId;
                this.getViewTaskAsync();
                console.log("viewTask", this.viewTask);
            });
        }

        catch (e) {
            throw new Error(e);
        }
    };

    // Функция запишет переход либо перезапишет существующий.
    public async onSetTransitionAsync(taskId: number) {
        console.log("taskId", taskId);
        this.commonService.setTransitionAsync(taskId, "View");
    };

    private async loadPaginationInit() {
        let paginationData = new PaginationInput();

        // TODO: доработать на динамическое получение из роута или как-нибудь еще, чтобы помнить, что выбирал пользователь.
        paginationData.PageNumber = 1;

        try {
            await this.http.post(API_URL.apiUrl.concat("/pagination/init-auction"), paginationData)
            .subscribe({
                next: (response: any) => {
                    console.log("pagination init", response);
                    this.countTotalPage = response.totalCount;
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

    // Функция пагинации.
    public async onPaginationChange(event: any) {
        console.log("page",event);

        let paginationData = new PaginationInput();
        paginationData.PageNumber = event.page + 1;
        paginationData.CountRows = event.rows;

        try {
            await this.http.post(API_URL.apiUrl.concat("/pagination/auction"), paginationData)
            .subscribe({
                next: (response: any) => {
                    console.log("filter pagination", response);
                    this.countTotalPage = response.totalCount;
                    this.aAuctionTasks = response.tasks;
                    this.router.navigate(['/auction'], {
                        queryParams: {
                            page: paginationData.PageNumber,
                            rows: paginationData.CountRows
                        }
                    });
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