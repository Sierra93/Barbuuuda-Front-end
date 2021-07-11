import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CommonDataService } from "src/app/services/common-data.service";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})

export class HomeModule implements OnInit {
    aQuestions: any[] = [];
    currentQuestion: number = 0;
    currentQuestionNumber: number = 0;
    iQuestionsCount: number = 0;
    aAnswers: any[] = [];
    aQuestion: any[] = [];
    isHidePanelTest: boolean = false;
    isHideStepsTest: boolean = false;
    isHidePanelStartTest: boolean = false;
    aProfileData: any[] = [];
    aCategories: any[] = [];
    aExecutorSpecializations: any[] = [];
    aInvities: any[] = [];
    bActivity: boolean = false;
    bAccept: boolean = false;
    bCancel: boolean = false;

    constructor(private http: HttpClient, private dataService: DataService, private router: Router, private commonDataService: CommonDataService) { }

    public async ngOnInit() {
        if (sessionStorage["role"] == "E") {
            await this.onGetInvitiesAsync();
        }

        await this.loadingActiveTasksAsync();
        await this.loadExecutorTestAsync();
        await this.loadingCountQuestionsAsync();
        await this.loadingProfileAsync();
        await this.loadingCategoryListAsync();
    };

    // Функция получает активные задания заказчика.
    private async loadingActiveTasksAsync() : Promise<void> {
        try {
            await this.http.get(API_URL.apiUrl.concat("/task/active"))
                .subscribe({
                    next: (response: any) => {
                        console.log("Активные задания", response);
                        this.dataService.aTasks = response;
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

            await this.http.get(API_URL.apiUrl.concat("/executor/answer?numberQuestion=1"))
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
                        // TODO: Проверить есть ли у ошибки статус.
                        if (err.status === 401) {
                            sessionStorage.clear();
                            sessionStorage["role"] = "G";

                            this.dataService.bGuest = true;

                            this.router.navigate(["/"]);
                        }

                        throw new Error(err);
                    }
                });
        }

        catch (e) {
            throw new Error(e);
        }
    };

    // Функция получает следующий вопрос для теста исполнителя.
    public async onNextQuestionAsync() : Promise<void> {
        try {
            let value = $("#idSelectedVariant:checked").parent().text();

            if (value == "") {
                $('#idNotSelectedVariant').modal('show');
                return;
            }

            this.aAnswers.push({
                answerVariantText: value,
                isRight: null,
                selected: false,
                questionNumber: this.currentQuestion
            });
            console.log("Массив с ответами", this.aAnswers);

            // Для получения второго вопроса, так как первый уже был выгружен изначально.
            if (this.currentQuestionNumber == 1) {
                this.currentQuestionNumber++;
            }

            await this.http.get(API_URL.apiUrl
                .concat("/executor/answer?numberQuestion="
                .concat(this.currentQuestionNumber.toString())))
                .subscribe({
                    next: (response) => {
                        console.log("Вопросы для теста исполнителей", response);
                        this.aQuestion = [];
                        this.aQuestion.push(response);
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
            await this.http.post(API_URL.apiUrl.concat("/executor/check"), {})
                .subscribe({
                    next: (response) => {
                        console.log("Пройден ли тест", response);
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
        this.isHidePanelTest = true;
        this.isHideStepsTest = true;
    };

    public onStartTest() {
        this.isHidePanelStartTest = true;
        this.isHidePanelTest = true;
        this.isHidePanelTest = false;
    };

    // Функция загружает всю информацию профиля.
    private async loadingProfileAsync(): Promise<void> {
        try {
            await this.http.get(API_URL.apiUrl.concat("/user/profile"))
                .subscribe({
                    next: (response: any) => {
                        this.aProfileData.push(response);
                        this.dataService.dateRegister = response.dateRegister.split(".")[0];
                        console.log("Данные профиля", this.aProfileData);
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
        this.aCategories = this.dataService.aTaskCategories;
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
    public async onSelectSpec(bCheck: boolean, specName: string): Promise<void> {
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
    
                        if (response.invities.length > 0) {
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
}