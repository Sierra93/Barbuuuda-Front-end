import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "../core/core-urls/api-url";
import { DataService } from "../services/data.service";

@Injectable({ providedIn: 'root' })
// Модуль общих функций приложения.
export class CommonDataService {
    constructor(private http: HttpClient, private dataService: DataService, private router: Router) { }

    // Функция получит список заданий выбранной даты в календаре.
    public async getTasksDateAsync(date: string): Promise<void> {
        try {
            let formatDate = date.toLocaleString();

            await this.http.get(API_URL.apiUrl
                .concat("task/concretely-date?date=".concat(formatDate)))
                .subscribe({
                    next: (response) => {
                        this.dataService.aTasks.push(response);
                        console.log(this.dataService.aTasks);
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
                        },

                        error: (err) => {
                            console.log(err);
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
            await this.http.get(API_URL.apiUrl.concat("/main/category-list"))
                .subscribe({
                    next: (response: any) => {
                        this.dataService.aTaskCategories = response;
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
            idleTime = idleTime + 1;

            if (idleTime > 19) { // 20 minutes
                sessionStorage.clear();
                localStorage.clear();
                // $(".right-panel").show();
                this.router.navigate(["/"]);
            }
        }
    };
}