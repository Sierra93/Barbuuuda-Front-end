import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { API_URL } from "../core/core-urls/api-url";
import { DataService } from "../services/data.service";

// Сервис общих функций приложения.
@Injectable()
export class CommonDataService {
    private aHeader: any[] = [];

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
                            sessionStorage.userToken = response;
                            console.log("refresh token");
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
                this.router.navigate(["/"]);
            }
        }
    };

    // Функция проверит авторизован ли пользователь. 
    public async getUserAuthorizeAsync(): Promise<any[]> {
        let self = this;

        this.router.events.subscribe(function (s) {
            if (s instanceof NavigationEnd) {
                if (s.url === "/login" || s.url === "/register") {
                    sessionStorage["role"] = "G";
                    self.dataService.setGuestUserRole(true);
                    return;
                }

                if (!sessionStorage["userToken"] && s.url !== "/public-offer"
                    && s.url !== "/register" && s.url !== "/login") {
                    self.router.navigate(["/"]);
                }

                if (!sessionStorage["userToken"] || !sessionStorage["role"]) {
                    sessionStorage["role"] = "G";
                    self.dataService.setGuestUserRole(true);
                }

                else {
                    self.dataService.setGuestUserRole(false);
                }
            }
        });

        try {
            return new Promise<any[]>(async resolve => {
                await this.http.get(API_URL.apiUrl.concat("/user/authorize?userName=".concat(sessionStorage["user"])))
                    .subscribe({
                        next: (response: any) => {
                            console.log("Хидер пользователя", response.aHeaderFields);
                            resolve(response.aHeaderFields);
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
}