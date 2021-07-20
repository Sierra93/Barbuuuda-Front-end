import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../core/core-urls/api-url";
import { DataService } from "../../services/data.service";

@Component({
  selector: "container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"]
})

export class ContainerModule implements OnInit {
  aFon: any[] = [];
  aWhyis: any[] = [];
  aWork: any[] = [];
  aProveliges: any[] = [];
  aAdvantages: any[] = [];
  aHope: any[] = [];
  aLastTasks: any[] = [];
  aCategories: any[] = [];

  constructor(private http: HttpClient, private dataService: DataService) { }

  public async ngOnInit() {
    await this.loadDataFonAsync();
    await this.loadDataWhyAsync();
    await this.loadDataWorkAsync();
    await this.loadDataPrivilegeAsync();
    await this.loadDataAdvantageAsync();
    await this.loadCategoryListAsync();
    await this.loadDataHopeAsync();
    await this.loadLastTasksAsync();

    this.aCategories = this.dataService.getTaskCategories();
  };

  // Функция подгрузит данные секции фона.
  private async loadDataFonAsync(): Promise<void> {
    try {
      await this.http.post(API_URL.apiUrl.concat("/main/get-fon"), {})
        .subscribe({
          next: (response) => {
            this.aFon.push(response);
            console.log("Данные секции фона", response);
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

  // Функция подгрузит данные секции почему.
  private async loadDataWhyAsync(): Promise<void> {
    try {
      await this.http.post(API_URL.apiUrl.concat("/main/get-why"), {})
        .subscribe({
          next: (response) => {
            this.aWhyis.push(response);
            console.log("Данные секции почему", response);
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

  // Функция подгрузит данные для секции как это работает.
  private async loadDataWorkAsync(): Promise<void> {
    try {
      await this.http.post(API_URL.apiUrl.concat("/main/get-work"), {})
        .subscribe({
          next: (response) => {
            this.aWork.push(response);
            console.log("Данные секции как это работает", response);
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

  // Функция подгрузит данные секции что вы получаете.
  private async loadDataPrivilegeAsync(): Promise<void> {
    try {
      await this.http.post(API_URL.apiUrl.concat("/main/get-privilege"), {})
        .subscribe({
          next: (response) => {
            this.aProveliges.push(response);
            console.log("Данные секции что вы получаете", response);
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

  // Функция подгрузит данные секции преимущества.
  private async loadDataAdvantageAsync(): Promise<void> {
    try {
      await this.http.post(API_URL.apiUrl.concat("/main/get-advantage"), {})
        .subscribe({
          next: (response) => {
            this.aAdvantages.push(response);
            console.log("Данные секции преимущества", response);
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

  // Функция подгрузит категории заданий.
  private async loadCategoryListAsync(): Promise<void> {
    try {
      await this.http.post(API_URL.apiUrl.concat("/main/category-list"), {})
        .subscribe({
          next: (response) => {
            this.dataService.setTaskCategories(response);
            console.log("Данные секции категории заданий", response);
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

  // Функция получит данные секции сотрудничество.
  private async loadDataHopeAsync(): Promise<void> {
    try {
      await this.http.post(API_URL.apiUrl.concat("/main/get-hope"), {})
        .subscribe({
          next: (response) => {
            this.aHope.push(response);
            console.log("Данные секции сотрудничества", response);
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

  // Функция получит данные секции последние задания.
  private async loadLastTasksAsync(): Promise<void> {
    try {
      await this.http.post(API_URL.apiUrl.concat("/main/last"), {})
        .subscribe({
          next: (response) => {
            this.aLastTasks.push(response);
            console.log("Данные секции последних заданий", response);
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
}