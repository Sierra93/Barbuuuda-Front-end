import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { API_URL } from "src/app/core/core-urls/api-url";
import { TaskInput } from "src/app/models/task/input/task-input";
import { CommonDataService } from "src/app/services/common-data.service";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: "task-edit",
    templateUrl: "./edit-task.component.html",
    styleUrls: ["./edit-task.component.scss"],
    providers: [ConfirmationService, MessageService]
})

export class EditTaskModule implements OnInit {
    aCategories: any[] = [];    
    taskTitle: string = "";
    taskDetail: string = "";
    categoryCode: string = "";
    specCode: string = "";
    taskEndda: any;
    taskPrice: any = "";
    categoryName: string = "";
    specName: string = "";
    taskId: number = 0;
    customerLogin: string = "";
    taskBegda: any;
    editTask: any;
    routeParam: number;    

    constructor(
        private commonService: CommonDataService, 
        private http: HttpClient, 
        private route: ActivatedRoute, 
        private dataService: DataService,
        private router: Router,
        private messageService: MessageService) {
        this.routeParam = +this.route.snapshot.queryParams.id;  // Получит параметр из роута.
        this.dataService.taskId = +this.route.snapshot.queryParams.id;
     }

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
            task.categoryCode = this.categoryCode !== "" ? this.categoryCode : this.editTask[0].categoryCode;
            task.specCode = this.specCode !== "" ? this.specCode : this.editTask[0].specCode;
            task.taskEndda = this.taskEndda;
            task.taskPrice = this.taskPrice;
            task.taskId = this.taskId;

            await this.http.post(API_URL.apiUrl.concat("/task/edit"), task)
                .subscribe({
                    next: (response: any) => {
                        // Сообщение при успешном изменении.
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно!',
                            detail: 'Задание успешно изменено'
                        });

                        setTimeout(() => {
                            this.router.navigate(['/task/view'], { queryParams: { id: this.taskId } });
                        }, 2000);
                    },

                    error: (err) => {
                       // Сообщение при ошибке изменения.
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

    // TODO: возможно нужно будет доработать случай при обновлении страницы.
    // Функция получит задание для просмотра.
    private async getEditTaskAsync(): Promise<void> {
        if (this.taskId == 0) {
            this.taskId = this.dataService.taskId;
        }
        
        await this.commonService.loadTaskListAsync("Single", this.taskId).then((data: any) => {
            this.editTask = data;
            this.customerLogin = data[0].customerLogin;
            this.taskTitle = data[0].taskTitle;
            this.taskDetail = data[0].taskDetail;
            this.taskPrice = data[0].taskPrice;
            this.taskBegda = data[0].taskBegda;
            this.taskEndda = data[0].taskEndda;
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

    /**
     * Функция изменит цену.
     * @param newPrice - новая цена.
     * @returns 
     */
    public onChangePrice(newPrice: string) {
        // TODO: добавить модалку об ошибке пустой цены
        if (!newPrice) {
            return;
        }

        if (newPrice.includes(" ")) {
            this.taskPrice = +newPrice.replace(/\s/g, "");
            return;
        }
        
        this.taskPrice = +newPrice;
    };

    /**
     * Функция изменит дату сдачи.
     * @param date - новая дата сдачи.
     */
    public onChangeDateEndda(date: any) {
        if (!date) {
            return;
        }

        this.taskEndda = date;
    };

    /**
     * Функция изменит детальное описание.
     * @param text - новое описание.
     */
    public onChangeDetail(text: any) {
        if (!text) {
            return;
        }

        this.taskDetail = text;
    };

    public onChangeTitle(title: any) {
        if (!title) {
            return;
        }

        this.taskTitle = title;
    };
}