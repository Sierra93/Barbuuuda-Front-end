import { HttpClient } from "@angular/common/http";
import { API_URL } from "../core/core-urls/api-url";
import { DataService } from "../services/data.service";

// Модуль общих функций приложения.
export class CommonModule {
    constructor(private http: HttpClient, private dataService: DataService) { }

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
    }
}