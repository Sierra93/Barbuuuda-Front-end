import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { API_URL } from "src/app/core/core-urls/api-url";
import { TaskInput } from "src/app/models/task/input/task-input";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "task-create",
    templateUrl: "./create-task.component.html",
    styleUrls: ["./create-task.component.scss"],
    providers: [ConfirmationService, MessageService]
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

    constructor(
        private commonService: CommonDataService, 
        private http: HttpClient,
        private router: Router,
        private messageService: MessageService) { }

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

     // Функция создаст задание.
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
                        // Сообщение при успешном создании.
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно!',
                            detail: 'Задание успешно создано'
                        });

                        setTimeout(() => {
                            this.router.navigate(['/task/view'], { queryParams: { id: response.taskId } });
                        }, 2000);
                    },

                    error: (err) => {
                        // Сообщение при ошибке создания.
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Ошибка!',
                            detail: 'Ошибка сохранения, проверьте заполнение полей'
                        });

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