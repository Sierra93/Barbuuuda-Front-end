import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { API_URL } from "src/app/core/core-urls/api-url";
import { TaskInput } from "src/app/models/task/input/task-input";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "task-create",
    templateUrl: "./create-task.component.html",
    styleUrls: ["./create-task.component.scss"]
})

export class CreateTaskModule implements OnInit {
    aCategories: any[] = [];    
    taskTitle: string = "";
    taskDetail: string = "";
    categoryCode: string = "";
    specCode: string = "";
    taskEndda: string = "";
    taskPrice: string = "";
    categoryName: string = "";
    specName: string = "";

    constructor(private commonService: CommonDataService, private http: HttpClient) { }

    public async ngOnInit() {
        await this.loadTaskCategoriesAsync();
    };

    // Функция подгрузит список категорий заданий.
    private async loadTaskCategoriesAsync() : Promise<void> {
        try {
            await this.commonService.loadTaskCategoriesAsync().then((data: any) => {
                this.aCategories = data;
            });            
        }

        catch (e) {
            throw new Error(e);
        }
    };

     // Функция создаст или изменит задание.
    public async onCreateTaskAsync() {
        try {
            let task = new TaskInput();
            task.taskTitle = this.taskTitle;
            task.taskDetail = this.taskDetail;
            task.categoryCode = this.categoryCode;
            task.specCode = this.specCode;
            task.taskEndda = this.taskEndda;
            task.taskPrice = this.taskPrice;

            await this.http.post(API_URL.apiUrl.concat("/task/create"), task)
                .subscribe({
                    next: (response: any) => {                    
                        console.log("Задание успешно создано");
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

    // Функция получит выбранную специализацию.
    public onGetSpec(specName: string, specCode: string, categoryName: string, categoryCode: string): void {
        this.categoryName = categoryName;
        this.specName = specName;
        this.categoryCode = categoryCode;
        this.specCode = specCode;
    };

    public onBack() {
        
    };
}