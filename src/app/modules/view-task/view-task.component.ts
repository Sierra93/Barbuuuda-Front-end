import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CommonDataService } from "src/app/services/common-data.service";
import { ConfirmationService, MessageService, PrimeNGConfig, Message, ConfirmEventType } from "primeng/api";
import { Title } from "@angular/platform-browser";
import { GetChangeRespondInput } from "src/app/models/respond/input/get-change-respond-input";
import { ChangeRespondInput } from "src/app/models/respond/input/change-respond-input";

@Component({
    selector: "task-view",
    templateUrl: "./view-task.component.html",
    styleUrls: ["./view-task.component.scss"],
    providers: [ConfirmationService, MessageService]
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
    displayModal: boolean = false;
    msgs: Message[] = [];
    position: string = "";
    dialogId: number = 0;
    aDialogs: any;
    displayDeleteModal: boolean = false;
    displaySelectExecutorModal: boolean = false;
    firstName: string = "";
    lastName: string = "";
    userName: string = "";
    displayChatModal: boolean = false;
    displayRespondModal: boolean = false;
    price: any;
    checked: boolean = false;
    comment: string = "";
    isChangeRespond: boolean = false;
    respondId: number = 0;

    constructor(private commonService: CommonDataService,
        private http: HttpClient, 
        private router: Router,
        private route: ActivatedRoute,
        private primengConfig: PrimeNGConfig,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private titleService: Title) {
        this.routeParam = +this.route.snapshot.queryParams.id;  // Получит параметр из роута.
    };

    public async ngOnInit() {
        await this.getTransitionAsync();
        await this.loadRespondsAsync();
        await this.loadDialogsAsync();

        this.role = sessionStorage["role"];

        this.primengConfig.ripple = true;

        if (this.role == "C") {
            await this.checkSelectPayTaskAsync();
            await this.loadWorkRespondAsync();
        }

        this.titleService.setTitle("Barbuuuda: Просмотр задания #" + +this.route.snapshot.queryParams.id);
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

    // TODO: возможно нужно будет доработать случай при обновлении страницы.
    // Функция получит задание для просмотра.
    private async getViewTaskAsync(): Promise<void> {
        await this.commonService.loadTaskListAsync("Single", this.routeParam).then((data: any) => {
            this.viewTask = data;
            console.log("viewTask", this.viewTask);

            this.customerLogin = data[0].customerLogin;
            this.taskTitle = data[0].taskTitle;
            this.taskDetail = data[0].taskDetail;
            this.taskPrice = data[0].taskPrice;
            this.taskBegda = data[0].taskBegda;
            this.categoryName = data[0].categoryName;
            this.specName = data[0].specName;
            this.taskId = this.routeParam;

            // Отображение цены или "По договоренности".
            this.bNotTaskPrice = data[0].taskPrice;     
        });
    };

    // Функция откроет чат.
    public onShowChat() {
        $("#idChat").modal("toggle");
    };

    // Функция покажет модалку об удалении задания.
    public onShowDeleteModal() {
        // $('#idAcceptDeleteTask').modal('show');
        this.displayDeleteModal = true;
    };

    // Функция покажет модалку ставки к заданию.
    public async onShowRespondModal() {
        if (sessionStorage["role"] == "E") {
            await this.checkRespondAsync();

            if (this.isRespond) {
                this.displayRespondModal = true;                

                return;
            }

            return;
        }
    };

    public async onRespondModal(respondId: number) {
        if (sessionStorage["role"] == "E") {
            await this.checkRespondAsync();

            if (this.isRespond) {
                this.displayRespondModal = true;
                this.isChangeRespond = true;     
                this.respondId = respondId;           

                await this.getChangedRespondAsync(this.taskId, respondId);

                return;
            }

            return;
        }
    };

    // Функция проверит, делал ли уже ставку текущий исполнитель.
    private async checkRespondAsync() : Promise<void> {
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

    // Функция отправит сообщение.
    public async onSendAsync() : Promise<void> {
        try {
            let params = {
                DialogId: this.dialogId,
                Message: this.message
            };

            await this.http.post(API_URL.apiUrl.concat("/chat/send"), params)
                .subscribe({
                    next: (response: any) => {
                        this.aMessages = response.messages;
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

    private async loadRespondsAsync() : Promise<void> {
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

    public showModalDialog() {
        this.displayModal = true;
    };

    confirm1() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: (type: any) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                        break;

                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                        break;
                }
            }
        });
    };

    confirm2() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: (type: any) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                        break;
                }
            }
        });
    };

    confirmPosition(position: string) {
        this.position = position;

        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: (type: any) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                        break;
                }
            },
            key: "positionDialog"
        });
    };

    // Функция запишет переход либо перезапишет существующий.
    public async onSetTransitionAsync(taskId: number) {
        console.log("taskId", taskId);
        this.commonService.setTransitionAsync(taskId, "Edit");
    };

    // Функция ответа на ставку исполнителя. Откроет чат с сообщениями диалога с исполнителем.
    public async onAnswerAsync(executorId: string): Promise<void> {
        try {
            let params = {
                ExecutorId: executorId,
                IsWriteBtn: true
            };

            await this.http.post(API_URL.apiUrl.concat("/chat/dialog"), params)
                .subscribe({
                    next: (response: any) => {
                        this.aMessages = response.messages;
                        this.statusArea = response.dialogState;

                        // Запишет Id диалога.
                        if (response.messages.length > 0) {
                            this.dialogId = response.messages[0].dialogId;
                            this.onGetDialogMessagesAsync(this.dialogId);
                        }

                        this.displayChatModal = true;
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

     // Функция получит список сообщений диалога.
    public async onGetDialogMessagesAsync(dialogId: number) : Promise<void> {
        try {
            let params = {
                DialogId: dialogId
            };
            this.dialogId = dialogId;

            await this.http.post(API_URL.apiUrl.concat("/chat/dialog"), params)
                .subscribe({
                    next: (response: any) => {
                        this.aMessages = response.messages;
                        this.statusArea = response.dialogState;
                        this.firstName = response.firstName;
                        this.lastName = response.lastName;
                        this.userName = response.userName;                          
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

    // Функция подгрузит список диалогов чата.
    private async loadDialogsAsync() : Promise<void> {
        try {
            await this.http.post(API_URL.apiUrl.concat("/chat/dialogs"), {})
                .subscribe({
                    next: (response: any) => {
                        this.aDialogs = response.dialogs;
                        console.log("Список диалогов", this.aDialogs);
                        this.openEmptyDialogAreaAsync();
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

     // Функция подгрузит список диалогов чата.
    private async openEmptyDialogAreaAsync() : Promise<void> {
        try {
            await this.http.post(API_URL.apiUrl.concat("/chat/dialog"), {})
                .subscribe({
                    next: (response: any) => {
                        this.statusArea = response.dialogState;
                        console.log("Пустая область чата открыта", this.statusArea);
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

     // Функция проверит оплачено ли задание и выбран ли исполнитель.
    private async checkSelectPayTaskAsync() : Promise<void> {
        try {
            let params = {
                TaskId: this.taskId
            };

            await this.http.post(API_URL.apiUrl.concat("/task/check-select-pay"), params)
                .subscribe({
                    next: (response: any) => {
                        console.log("Оплачено и выбран исполнитель", response);
                        this.bSelectPay = response;
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

    // Функция оставит только ставку исполнителя, который принял в работу задание.
    private async loadWorkRespondAsync() : Promise<void> {
        try {
            let params = {
                TaskId: this.taskId
            };

            await this.http.post(API_URL.apiUrl.concat("/task/check-accept-invite"), params)
                .subscribe({
                    next: (response: any) => {
                        console.log(response);
                        this.aResponds = response.responds;
                        this.bWorkAccept = response.isWorkAccept;
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

     // Функция выберет исполнителя задания.
    public async onSelectExecutorAsync(taskId: number, executorId: string) {
        try {
            let params = {
                TaskId: taskId,
                ExecutorId: executorId
            };

            await this.http.post(API_URL.apiUrl.concat("/task/select"), params)
                .subscribe({
                    next: (response: any) => {
                        console.log(response.data);

                        if (response.data) {
                            this.loadRespondsAsync();
                            this.displaySelectExecutorModal = true;
                            return;
                        }
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

     // Функция удалит задание.
    public async OnDeleteTaskAsync() {
        try {            
            await this.http.put(API_URL.apiUrl.concat("/task/delete/" + this.taskId), {})
                .subscribe({
                    next: (response: any) => {
                        // TODO: выводить тут сообщение тостом об успешном удалении.
                        if (response) {
                            console.log("Успешно удалено");
                            // Сообщение при успешном удалении.
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Успешно!',
                                detail: 'Задание успешно удалено.'
                            });

                            setTimeout(() => {
                                this.router.navigate(['/tasks/my']);
                            }, 2000);
                        }
                    },

                    error: (err) => {
                        // Сообщение при ошибке изменения.
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Ошибка!',
                            detail: 'Ошибка удаления. Попробуйте обновить страницу и повторно удалить задание.'
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

    // Функция оставит ставку к заданию.
    public async onRespondAsync() {
        try {            
            let params = {
                Price: this.price,
                Comment: this.comment,
                TaskId: this.taskId
            };

            await this.http.post(API_URL.apiUrl.concat("/executor/create-respond"), params)
                .subscribe({
                    next: (response: any) => {
                        console.log("Ставка к заданию сделана");
                        this.loadRespondsAsync();
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

    // Функция изменит ставку задания.
    public async onChangeRespondAsync() {
        try {            
            let changeRespond = new ChangeRespondInput();
            changeRespond.Price = this.price;
            changeRespond.Comment = this.comment;
            changeRespond.TaskId = this.taskId;      
            changeRespond.RespondId = this.respondId;      

            await this.http.patch(API_URL.apiUrl.concat("/executor/change-respond"), changeRespond)
                .subscribe({
                    next: (response: any) => {
                        console.log("Ставка изменена");
                        this.loadRespondsAsync();
                        this.displayRespondModal = false;

                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно!',
                            detail: 'Ставка успешно изменена.'
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

    // Функция получит ставку и одтянет ее данные в диалог.
    private async getChangedRespondAsync(taskId: number, respondId: number) {
        try {            
            let getChangeRespond = new GetChangeRespondInput();
            getChangeRespond.TaskId = taskId;
            getChangeRespond.RespondId = respondId;

            await this.http.post(API_URL.apiUrl.concat("/executor/get-change-respond"), getChangeRespond)
                .subscribe({
                    next: (response: any) => {
                        console.log("Данные ставки");
                        this.price = response.price;
                        this.comment = response.comment;
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
