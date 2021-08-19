import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { PaginationInput } from "src/app/models/pagination/input/pagination-input";
import { CommonDataService } from "src/app/services/common-data.service";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: "my-tasks",
    templateUrl: "./my-tasks.component.html",
    styleUrls: ["./my-tasks.component.scss"]
})

export class MyTaskModule implements OnInit {
    aMyTasks: any = [];
    countTotalPage = 0;
    aTasks: any = [];
    aWorkTasks: any = [];
    role: any = "";
    sSearch = "";
    aSortDataSelect: any[] = [];
    aFilterDataSelect: any[] = [];        
    isVisiblePagination: boolean = false;

    constructor(private http: HttpClient,
        private commonService: CommonDataService,
        private router: Router,
        private dataService: DataService) {

    }

    public async ngOnInit() {                
        await this.loadTaskListAsync();
        await this.loadMyTasksAsync();

        this.role = await this.checkUserRoleAsync();

        await this.loadSortDataSelectAsync();
        await this.loadFilterDataSelectAsync();
        await this.loadPaginationMyCustomerInit();
    };

    // Функция получит список заданий заказчика.
    private async loadTaskListAsync() {
        await this.commonService.loadTaskListAsync("All", null).then((data: any) => {
            this.aMyTasks = data;     
            console.log("Мои задания: ", this.aMyTasks);       
         });           
    };  

    // Функция получит задания, которые находятся в работе у исполнителя.
    private async loadMyTasksAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/executor/work"), {})
                .subscribe({
                    next: (response: any) => {
                        if (this.role == "E") {
                            this.aWorkTasks = response.tasks;
                        }

                        if (this.role == "C") {
                            this.aMyTasks = response.tasks;
                        }

                        console.log("Задания в работе", response.tasks);
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

    private async checkUserRoleAsync() {
        await this.commonService.getUserRoleAsync().then((data: any) => {
            this.role = data.userRole;
            sessionStorage["role"] = data.userRole;
        });
    };

    // Функция найдет задания в соответствии с поисковым параметром.
    public async onSearchTaskAsync(param: any) {
        try {
            let newUrl;
            let oldUrl = ("/tasks/my");
            window.history.pushState({ path: oldUrl }, '', oldUrl);

            await this.http.get(API_URL.apiUrl.concat("/task/search?param=".concat(param)))
                .subscribe({
                    next: (response: any) => {
                        console.log("filter data", response);
                        this.aMyTasks = response;

                        if (+param === NaN) {
                            newUrl = window.location.href + "/search=" + param;
                            window.history.pushState({ path: newUrl }, '', newUrl);
                        }

                        else {
                            newUrl = window.location.href + "/id=" + param;
                            window.history.pushState({ path: newUrl }, '', newUrl);
                        }
                    },

                    error: (err) => {
                        window.history.pushState({ path: oldUrl }, '', oldUrl);
                        throw new Error(err);
                    }
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

    // Функция получит список значений для селекта сортировки заданий.
    private async loadSortDataSelectAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/task/get-sort-select"), {})
                .subscribe({
                    next: (response: any) => {                       
                        this.aSortDataSelect = response.controlSorts;                                            
                        console.log("sortDataSelect ", response.controlSorts);
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

    // Функция получит список значений для селекта фильтрации заданий.
    private async loadFilterDataSelectAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/task/get-filter-select"), {})
                .subscribe({
                    next: (response: any) => {                        
                        this.aFilterDataSelect = response.controlFilters;                                                        
                        console.log("filterDataSelect ", response.controlFilters);
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

    // Функция получит задания для страницы мои задания заказчика на ините.
    private async loadPaginationMyCustomerInit() {
        let paginationData = new PaginationInput();

        // TODO: доработать на динамическое получение из роута или как-нибудь еще, чтобы помнить, что выбирал пользователь.
        paginationData.PageNumber = 1;

        try {
            await this.http.post(API_URL.apiUrl.concat("/pagination/init-my-customer"), paginationData)
            .subscribe({
                next: (response: any) => {
                    console.log("pagination my customer init", response);
                    this.countTotalPage = response.totalCount;
                    this.aMyTasks = response.tasks;
                    this.isVisiblePagination = response.isVisiblePagination;
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
        console.log("page my customer",event);

        let paginationData = new PaginationInput();
        paginationData.PageNumber = event.page + 1;
        paginationData.CountRows = event.rows;

        try {
            await this.http.post(API_URL.apiUrl.concat("/pagination/my-customer"), paginationData)
            .subscribe({
                next: (response: any) => {
                    console.log("filter my customer pagination", response);
                    this.countTotalPage = response.totalCount;
                    this.aMyTasks = response.tasks;

                    this.router.navigate(['/tasks/my'], {
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