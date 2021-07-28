import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    customerLogin: string = "";
    taskTitle: string = "";
    taskDetail: string = "";
    taskPrice: string = "";
    taskBegda: any;
    categoryName: string = "";
    specName: string = "";
    role: string = "";
    respondCount: number = 0;
    bSelectPay: boolean = false;
    bWorkAccept: boolean = false;
    isRespond: boolean = false;
    bNotTaskPrice: boolean = false; // TODO: доработать на наличие цены задания
    aMessages: any = [];
    message: string = "";
    statusArea: string = "";
    aResponds: any = [];
    routeParam: number;

    constructor(private commonService: CommonDataService, private http: HttpClient, private router: Router, private route: ActivatedRoute) { 
        this.routeParam = +this.route.snapshot.queryParams.id;  // Получит параметр из роута.
    };

    public async ngOnInit() {
        await this.getTransitionAsync();
        await this.loadRespondsAsync();

        this.role = sessionStorage["role"];
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

    // TODO: возможно нужно будет доработать случай при обновлении страницы.
    // Функция получит задание для просмотра.
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

    // Функция откроет чат.
    public onShowChat() {
        $("#idChat").modal("toggle");
    };

    // Функция покажет модалку об удалении задания.
    public onShowDeleteModal() {
        $('#idAcceptDeleteTask').modal('show');
    };

    // Функция покажет модалку ставки к заданию.
    public onShowRespondModal() {
        if (sessionStorage["role"] == "E") {
            this.checkRespondAsync();

            if (this.isRespond) {
                $('#idRespond').modal('show');
                return;
            }

            return;
        }
    };

    // Функция проверит, делал ли уже ставку текущий исполнитель.
    private async checkRespondAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/executor/check-respond"), {})
                .subscribe({
                    next: (response: any) => {                    
                        this.isRespond = response;
                        console.log(this.isRespond);
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

    // TODO: тут доработать на получение с бэка флага редактирования bEdit.
    // Функция переходит к изменению задания.
    onEditTask() {
        // this.oEditTask.editTask.bEdit = true;
        this.router.navigate(["/task/create"]);
    };

    // Функция отправит сообщение.
    public async onSendAsync() {
        try {
            let oDataMessage = {
                // DialogId: this.dialogId,
                // Message: this.message
            };

            await this.http.post(API_URL.apiUrl.concat("/chat/send"), oDataMessage)
                .subscribe({
                    next: (response: any) => {                    
                        this.aMessages = response.data.messages;
                        console.log("Сообщение успешно отправлено", this.aMessages);
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

    private async loadRespondsAsync() {
        try {
            let params = {
                TaskId: this.routeParam 
            };
            
            await this.http.post(API_URL.apiUrl.concat("/task/get-responds"), params)
                .subscribe({
                    next: (response: any) => {                    
                        console.log("Список ставок к заданию", response);
                        this.aResponds = response.responds;
                        this.respondCount = response.count;
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