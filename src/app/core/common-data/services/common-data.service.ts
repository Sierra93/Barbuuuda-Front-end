import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../../core-urls/api-url';
import { TaskStructure } from '../task/models/task-structure';

// Сервис общих функций приложения.
export default class CommonData {
    TaskStructure: any[] = [];

    constructor(private http: HttpClient) { }

    // Функция получит список заданий выбранной даты в календаре.
    public async getTasksDateAsync(date: string): Promise<TaskStructure[]> {
        try {
            let formatDate = date.toLocaleString();

            let tasks = await this.http.get<Promise<TaskStructure>>(apiUrls.apiUrl
                .concat("task/concretely-date?date=".concat(formatDate)));

            tasks.forEach(el => {
                this.TaskStructure.push(el);
            });

            return this.TaskStructure;
        }

        catch (e) {
            throw new Error(e);
        }
    }
}