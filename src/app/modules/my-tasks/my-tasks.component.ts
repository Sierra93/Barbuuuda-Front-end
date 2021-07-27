import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CommonDataService } from "src/app/services/common-data.service";

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

    constructor(private http: HttpClient, private commonService: CommonDataService, private router: Router) { }

    public async ngOnInit() {
        await this.loadTaskListAsync();
        await this.getTotalPageetPaginationAsync();
        await this.onGetPaginationAsync();
        await this.loadMyTasksAsync();
        this.role = await this.checkUserRoleAsync();
    };

    // Функция получит список заданий заказчика.
    private async loadTaskListAsync() {
        await this.commonService.loadTaskListAsync("All", null).then((data: any) => {
            this.aMyTasks = data;            
         });           
    };

    // Функция получит общее кол-во страниц.
    private async getTotalPageetPaginationAsync() {
        try {
            await this.http.get(API_URL.apiUrl.concat("/pagination/page?pageIdx=1"))
                .subscribe({
                    next: (response: any) => {
                        console.log("total page pagination", response);
                        this.countTotalPage = response.pageData.totalPages;
                        this.aTasks = response.tasks
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

    // Функция пагинации.
    public async onGetPaginationAsync(param: any = 1) {
        try {
            await this.http.get(API_URL.apiUrl.concat("/pagination/page?pageIdx=".concat(param)))
                .subscribe({
                    next: (response: any) => {
                        console.log("filter pagination", response);
                        this.aMyTasks = response.tasks;
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
}