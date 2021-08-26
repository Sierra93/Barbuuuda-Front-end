import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CommonDataService } from "src/app/services/common-data.service";
import { DataService } from "src/app/services/data.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { NextQuestionInput } from "src/app/models/executor/input/next-question-input";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    providers: [DataService, ConfirmationService, MessageService]
})

export class HomeModule implements OnInit {
    aQuestions: any[] = [];
    currentQuestion: number = 0;
    currentQuestionNumber: number = 0;
    iQuestionsCount: number = 0;
    aAnswers: any[] = [];    
    isHidePanelTest: boolean = false;
    isHideStepsTest: boolean = false;
    isHidePanelStartTest: boolean = false;
    oProfileData: any = {};
    aCategories: any[] = [];
    aExecutorSpecializations: any[] = [];
    aInvities: any[] = [];
    bActivity: boolean = false;
    bAccept: boolean = false;
    bCancel: boolean = false;
    role: string = "";
    selectedVariant: string = "";

    constructor(private http: HttpClient,
         private dataService: DataService, 
         private router: Router, 
         private commonDataService: CommonDataService,
         private commonService: CommonDataService,
         private messageService: MessageService,
         private titleService: Title) { }

    public async ngOnInit() {
        if (sessionStorage["role"] == "E") {
            await this.onGetInvitiesAsync();
        }

        await this.loadingActiveTasksAsync();
        await this.loadExecutorTestAsync();
        await this.loadingCountQuestionsAsync();
        await this.loadingProfileAsync();
        await this.loadingCategoryListAsync();
        await this.checkUserRoleAsync();    

        this.titleService.setTitle("Barbuuuda: Главная");
    };

    // Функция получает активные задания заказчика.
    private async loadingActiveTasksAsync() : Promise<void> {
        try {
            await this.http.get(API_URL.apiUrl.concat("/task/active"))
                .subscribe({
                    next: (response: any) => {
                        console.log("Активные задания", response);
                        this.dataService.setTasksList(response);
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

    // Функция выгружает данные для теста исполнителей.
    private async loadExecutorTestAsync() : Promise<void> {
        try {
            if (sessionStorage["role"] !== "E") {
                return;
            }

            let data = new NextQuestionInput();
            data.NumberQuestion = 1;

            await this.http.post(API_URL.apiUrl.concat("/executor/answer"), data)
                .subscribe({
                    next: (response: any) => {
                        console.log("Вопросы для теста исполнителей", response);
                        this.aQuestions.push(response);
                        this.currentQuestion = 1;
                        this.currentQuestionNumber = 1;
                        console.log("Текущий вопрос", this.currentQuestionNumber);
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

    // Функция получает кол-во вопросов для теста исполнителя.
    private async loadingCountQuestionsAsync() : Promise<void> {
        try {
            await this.http.get(API_URL.apiUrl.concat("/executor/answers-count"))
                .subscribe({
                    next: (response: any) => {
                        console.log("Кол-во вопросов", response);
                        this.iQuestionsCount = response;
                    },

                    error: (err: any) => {
                        this.commonDataService.routeToStart(err);

                        throw new Error(err);
                    }
                });
        }

        catch (e) {
            throw new Error(e);
        }
    };

    public onSelectVariant(selectedVariant: string) {
        console.log("selectedVariant", selectedVariant);
    };

    // Функция получит следующий вопрос для теста исполнителя.
    public async onNextQuestionAsync() : Promise<void> {
        try {
            if (!this.selectedVariant) {
                this.messageService.add({
                    severity: "warn",
                    summary: "Предупреждение!",
                    detail: "Не выбран вариант ответа."
                });

                return;
            }            

            this.aAnswers.push({
                answerVariantText: this.selectedVariant,
                isRight: null,
                selected: false,
                questionNumber: this.currentQuestion
            });

            console.log("Массив с ответами", this.aAnswers);

            // Для получения второго вопроса, так как первый уже был выгружен изначально.
            if (this.currentQuestionNumber == 1) {
                this.currentQuestionNumber++;
            }

            let data = new NextQuestionInput();
            data.NumberQuestion = this.currentQuestionNumber;

            await this.http.post(API_URL.apiUrl.concat("/executor/answer"), data)
                .subscribe({
                    next: (response) => {
                        console.log("Вопросы для теста исполнителей", response);
                        this.aQuestions = [];
                        this.aQuestions.push(response);
                        console.log("this.aQuestions", this.aQuestions);
                        this.currentQuestion++;   
                        this.currentQuestionNumber++;          
                        console.log("Вопрос", this.currentQuestion);
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

    // Функция отправляет массив с ответами на тест исполнителя для проверки.
    public async onCheckAnswersTestAsync() : Promise<void> {
        try {
            await this.http.post(API_URL.apiUrl.concat("/executor/check"), this.aAnswers)
                .subscribe({
                    next: (response) => {
                        console.log("Пройден ли тест", response);

                        if (!response) {
                            this.messageService.add({
                                severity: "warn",
                                summary: "Прохождение теста",
                                detail: "Тест не пройден. Прочитайте еще раз правила сервиса и попробуйте снова."
                            });

                            this.loadExecutorTestAsync();

                            return;
                        }

                        this.messageService.add({
                            severity: "success",
                            summary: "Прохождение теста",
                            detail: "Тест успешно пройден. Теперь вам доступен поиск заданий в аукционе."
                        });                        
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

    public onStartSteps() {
        if (this.role == "E") {
            this.isHidePanelTest = true;
            this.isHideStepsTest = true;
        }
    };

    public onStartTest() {
        if (this.role == "E") {
            this.isHidePanelStartTest = true;
            this.isHidePanelTest = true;
            this.isHidePanelTest = false;
        }
    };

    // Функция загружает всю информацию профиля.
    private async loadingProfileAsync(): Promise<void> {
        try {
            await this.http.post(API_URL.apiUrl.concat("/user/profile"), {})
                .subscribe({
                    next: (response: any) => {
                        this.oProfileData = response;
                        let date = response.dateRegister.split(".")[0];
                        this.dataService.setDateRegister(date);
                        console.log("Данные профиля", this.oProfileData);
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

     // Функция выгружает список категорий заданий.
    private async loadingCategoryListAsync(): Promise<void> {
        await this.commonDataService.getTaskCategoriesAsync();
        this.aCategories = this.dataService.getTaskCategories();
    };

    // Функция сохраняет выбранные специализации исполнителя.
    public async onSaveSpecies(): Promise<void> {
        try {
            await this.http.post(API_URL.apiUrl.concat("/executor/add-spec"), this.aExecutorSpecializations)
                .subscribe({
                    next: (response) => {
                        console.log("Специализации сохранены");
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

    // Функция добавляет специализацию.
    public async onSelectSpecAsync(bCheck: boolean, specName: string): Promise<void> {
        // Добавит специализацию в массив.
        if (bCheck) {
            this.aExecutorSpecializations.push({ SpecName: specName });
            console.log("checked true", this.aExecutorSpecializations);
            return;
        }

        console.log("checked false");
    };

    // Функция получит список заданий, в которых был выбран исполнитель.
    public async onGetInvitiesAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/executor/invite"), {})
                .subscribe({
                    next: (response: any) => {
                        this.aInvities = response.tasks;
                        console.log("Список приглашений", response);
    
                        if (response.tasks.length > 0) {
                            this.bActivity = true;
                        }
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

    // Функция принятия в работу задания.
    public async onAcceptTaskAsync(taskId: number): Promise<void> {
        try {
            let params = {
                TaskId: taskId
            };

            await this.http.post(API_URL.apiUrl.concat("/executor/accept"), params)
                .subscribe({
                    next: async (response) => {
                        console.log("Задача ".concat(taskId.toString()).concat(" принята в работу"), response);

                        if (response) {
                            this.bAccept = true;

                            await this.onGetInvitiesAsync();
                        }
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

    public async onCancelTaskAsync(taskId: number) {
        try {
            let params = {
                TaskId: taskId
            };

            await this.http.post(API_URL.apiUrl.concat("/executor/accept"), params)
                .subscribe({
                    next: async (response) => {
                        console.log("Задача ".concat(taskId.toString()).concat(" отклонена"), response);

                        if (response) {
                            this.bCancel = true;

                            await this.onGetInvitiesAsync();
                        }
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
}