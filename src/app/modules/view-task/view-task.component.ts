import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "task-view",
    templateUrl: "./view-task.component.html",
    styleUrls: ["./view-task.component.scss"]
})

export class ViewTaskModule implements OnInit {
    taskId: number = 0;
    viewTask: any;

    constructor(private commonService: CommonDataService, private http: HttpClient) { }

    public async ngOnInit() {
        await this.getTransitionAsync();
    };

    // Функция получит переход.
    private async getTransitionAsync() : Promise<void> {
        try {
            await this.http.post(API_URL.apiUrl.concat("/task/get-transition"), {})
                .subscribe({
                    next: (response: any) => {                    
                        console.log("get transition", response.taskId);
                        this.taskId = response.taskId;
                        this.getViewTaskAsync();
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

    // Функция получит задание для просмотра.
    private async getViewTaskAsync(): Promise<void> {
        await this.commonService.loadTaskListAsync("Single", this.taskId).then((data: any) => {
            this.viewTask = data;
            console.log("viewTask", this.viewTask);
        });
    };
}