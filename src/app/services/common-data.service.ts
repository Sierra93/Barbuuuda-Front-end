import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { API_URL } from "../core/core-urls/api-url";
import { TaskOutput } from "../models/task/output/task-output";
import { DataService } from "../services/data.service";

// Сервис общих функций приложения.
@Injectable()
export class CommonDataService {
    bShowGuestHeader: boolean = false;
    aMyTasks: any = [];

    constructor(private http: HttpClient, private dataService: DataService, private router: Router) { }

    // Функция получит список заданий выбранной даты в календаре.
    public async getTasksDateAsync(date: string): Promise<void> {
        try {
            let formatDate = date.toLocaleString();

            await this.http.get(API_URL.apiUrl
                .concat("task/concretely-date?date=".concat(formatDate)))
                .subscribe({
                    next: (response) => {
                        this.dataService.setTasksList(response);
                    },

                    error: (err) => {
                        console.log(err);
                    }
                });
        }

        catch (e) {
            throw new Error(e);
        }
    };

    // Функция обновит токена пользователя.
    public async refreshToken(): Promise<void> {
        setInterval(async () => {
            if (!sessionStorage.userToken) {
                // clearInterval(intervalID);
                clearInterval();
                return;
            }

            try {
                await this.http.get(API_URL.apiUrl.concat("/user/token?userName=").concat(sessionStorage.user))
                    .subscribe({
                        next: (response: any) => {
                            sessionStorage.userToken = response.userToken;
                            sessionStorage["role"] = response.userRole;
                            console.log("refresh token");
                            console.log("refresh role", response.userRole);
                        },

                        error: (err) => {
                            console.log(err);
                            console.log('Ошибка обновления токена');
                        }
                    });
            }

            catch (e) {
                throw new Error(e);
            }
        }, 530000); // Каждые 9 мин.  
    };

    // Функция получает список всех категорий.
    public async getTaskCategoriesAsync(): Promise<void> {
        try {
            await this.http.post(API_URL.apiUrl.concat("/main/category-list"), {})
                .subscribe({
                    next: (response: any) => {
                        this.dataService.setTaskCategories(response);
                        console.log("Список категорий заданий", response);
                    },

                    error: (err) => {
                        console.log(err);
                    }
                });
        }

        catch (e) {
            throw new Error(e);
        }
    };

    public replaceSpacesPrice(price: string): string {
        return price.replace(/\s/g, "").toString();
    };

    // Функция отсчитывает время бездействия юзера, по окончании простоя убивает сессию и перенаправляет на стартовую для авторизации.
    public deadlineSession(): void {
        var idleTime = 0;

        $(document).ready(() => {
            //Increment the idle time counter every minute.
            var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

            //Zero the idle timer on mouse movement.
            $(this).mousemove(function (e) {
                idleTime = 0;
            });

            $(this).keypress(function (e) {
                idleTime = 0;
            });
        });

        const timerIncrement = () => {
            idleTime++;

            if (idleTime > 19) { // 20 minutes
                sessionStorage.clear();
                localStorage.clear();
                // $(".right-panel").show();
                this.router.navigate(["/login"]);
            }
        }
    };

    // Функция проверит авторизован ли пользователь. 
    public async getUserAuthorizeAsync() {
        let self = this;

        if (!sessionStorage["userToken"] || !sessionStorage["role"]) {
            return;
        }

        this.router.events.subscribe(function (s) {
            if (s instanceof NavigationEnd) {
                // Условие для показа гостевого хидера.
                if (s.url === "/login" || s.url === "/register" || s.url === "/") {
                    self.bShowGuestHeader = true;
                    return;
                }

                if (!sessionStorage["userToken"] && s.url !== "/public-offer"
                    && s.url !== "/register" && s.url !== "/login") {
                    self.router.navigate(["/login"]);
                }                
            }
        });

        try {            
            return new Promise<any[]>(async resolve => {
                await this.http.get(API_URL.apiUrl.concat("/user/authorize?userName=".concat(sessionStorage["user"])))
                    .subscribe({
                        next: (response: any) => {
                            if (!this.bShowGuestHeader) {
                                console.log("Хидер пользователя", response.aHeaderFields);
                                resolve(response.aHeaderFields);
                                return;
                            }
                            
                            return [];
                        },

                        // Токен протух, получить новый.
                        error: async () => {
                            await this.http.get(API_URL.apiUrl.concat("/user/authorize?userName=").concat(sessionStorage["user"]))
                                .subscribe({
                                    next: (response: any) => {
                                        if (sessionStorage["user"] !== undefined && sessionStorage["user"] !== "") {
                                            sessionStorage["userToken"] = response;
                                        }

                                        // Удалит токен юзера. Теперь нужно снова авторизоваться.
                                        else {
                                            sessionStorage.clear();
                                        }
                                    },

                                    error: () => { }
                                });
                        }
                    });
            })
        }

        catch (e) {
            throw new Error(e);
        }
    };

    // Функция проверит роль пользователя.
    public async getUserRoleAsync(): Promise<string> {
        try {
            return new Promise<string>(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/user/role"), {})
                    .subscribe({
                        next: (response: any) => {
                            console.log("role data: ", response);
                            resolve(response);
                        },

                        error: (err) => {
                            console.log(err);
                        }
                    });
            })
        }

        catch (e) {
            throw new Error(e);
        }
    };

    // Фугкция получит сумму баланса пользователя.
    public async GetBalanceAsync(): Promise<any> {
        try {
            let params = {
                UserName: sessionStorage["user"]
            };

            return new Promise<any>(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/payment/balance"), params)
                    .subscribe({
                        next: (response: any) => {
                            console.log("Баланс:", response.amount);
                            resolve(response.amount);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            })
        }

        catch (e) {
            throw new Error(e);
        }
    };

    // Функция запишет переход либо перезапишет существующий.
    public async setTransitionAsync(taskId: any, type: string) : Promise<void> {        
        try {
            let params = {
                TaskId: taskId,
                Type: type
            };

            return new Promise<any>(async () => {
                await this.http.post(API_URL.apiUrl.concat("/task/set-transition"), params)
                    .subscribe({
                        next: (response: any) => {
                            if (type == "View") {
                                this.router.navigate(['/task/view'], { queryParams: { id: taskId } });
                            }
                          
                            if (type == "Edit") {
                                this.router.navigate(['/task/edit'], { queryParams: { id: taskId } });
                            }
                        },

                        error: (err) => {
                            if (err.status === 401) {
                                sessionStorage.clear();
                                sessionStorage["role"] = "G";
    
                                this.router.navigate(["/login"]);
                            }

                            throw new Error(err);
                        }
                    })
            });
        }

        catch (e) {
            throw new Error(e);
        }
    };

    public routeToStart(err: any) {
        if (err.status === 401) {
            sessionStorage.clear();
            sessionStorage["role"] = "G";

            this.router.navigate(["/login"]);
        }
    };

    // Функция получит либо одно задание либо список.
    public async loadTaskListAsync(type: string, taskId: number | null) : Promise<any> {
        try {
            let params = {};

            // Если Id задания передан, значит идет просмотр задания.
            if (taskId == null) {
                params = {
                    Type: type,                    
                };
            }
            
            else {
                params = {
                    Type: type,
                    TaskId: taskId
                };
            }

            return new Promise<any>(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/task/tasks-list"), params)
                    .subscribe({
                        next: (response: any) => {
                            console.log("Задания", this.aMyTasks);
                            resolve(response);
                        },

                        error: (err) => {
                            this.routeToStart(err);
                            throw new Error(err);
                        }
                    })
            });
        }

        catch (e) {
            throw new Error(e);
        }
    };

    // Функция получит переход.
    public async getTransitionAsync() : Promise<TaskOutput> {
        try {
            return new Promise<TaskOutput>(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/task/get-transition"), {})
                    .subscribe({
                        next: (response: any) => {
                            console.log("get transition", response.taskId);

                            let task = new TaskOutput();
                            task.taskId = response.taskId;
                            // task.customerLogin = response[0].customerLogin;
                            // task.taskTitle = response[0].taskTitle;
                            // task.taskDetail = response[0].taskDetail;
                            // task.taskPrice = response[0].taskPrice;
                            // task.taskBegda = response[0].taskBegda;
                            // task.categoryName = response[0].categoryName;
                            // task.specName = response[0].specName;

                            resolve(task);
                        },

                        error: (err) => {
                            this.routeToStart(err);
                            throw new Error(err);
                        }
                    })
            });            
        }

        catch (e) {
            throw new Error(e);
        }
    };
}