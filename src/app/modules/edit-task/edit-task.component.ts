import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { API_URL } from "src/app/core/core-urls/api-url";
import { TaskInput } from "src/app/models/task/input/task-input";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "task-edit",
    templateUrl: "./edit-task.component.html",
    styleUrls: ["./edit-task.component.scss"]
})

export class EditTaskModule implements OnInit {
    aCategories: any[] = [];    
    taskTitle: string = "";
    taskDetail: string = "";
    categoryCode: string = "";
    specCode: string = "";
    taskEndda: string = "";
    taskPrice: string = "";
    categoryName: string = "";
    specName: string = "";
    taskId: number = 0;
    customerLogin: string = "";
    taskBegda: any;
    editTask: any;

    constructor(private commonService: CommonDataService, private http: HttpClient) { }

    public async ngOnInit() {
        await this.getTransitionAsync();
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
    public async onChangeTaskAsync() {
        try {
            let task = new TaskInput();
            task.taskTitle = this.taskTitle;
            task.taskDetail = this.taskDetail;
            task.categoryCode = this.categoryCode;
            task.specCode = this.specCode;
            task.taskEndda = this.taskEndda;
            task.taskPrice = this.taskPrice;

            await this.http.post(API_URL.apiUrl.concat("/task/edit"), task)
                .subscribe({
                    next: (response: any) => {                    
                        console.log("Задание успешно изменено");
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

    // TODO: возможно нужно будет доработать случай при обновлении страницы.
    // Функция получит задание для просмотра.
    private async getEditTaskAsync(): Promise<void> {
        await this.commonService.loadTaskListAsync("Single", this.taskId).then((data: any) => {
            this.editTask = data;
            console.log("editTask", this.editTask);

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
    private async getTransitionAsync() : Promise<void> {
        try {
            await this.commonService.getTransitionAsync().then((data: any) => {
                this.editTask = data.taskId;
                this.getEditTaskAsync();
                console.log("editTask", this.editTask);
            });            
        }

        catch (e) {
            throw new Error(e);
        }
    };
}