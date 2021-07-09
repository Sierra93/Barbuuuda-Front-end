import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../../core/core-urls/api-url';
import { commonObjectData } from '../../core/common-data/models/common-object-data';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class ContainerModule implements OnInit {
  aFon: any[] = [];
  aWhyis: any[] = [];
  aWork: any[] = [];
  aProveliges: any[] = [];
  aAdvantages: any[] = [];
  
  constructor(private http: HttpClient) { }

  public async ngOnInit() {
    this.loadDataFonAsync();
    this.loadDataWhyAsync();
    this.loadDataWorkAsync();
    this.loadDataPrivilegeAsync();
    this.loadDataAdvantageAsync();
    this.loadCategoryListAsync();
  };

  // Функция подгрузит данные секции фона.
  private async loadDataFonAsync(): Promise<void> {
    try {
      await this.http.post(apiUrls.apiUrl.concat("/main/get-fon"), {})
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
      await this.http.post(apiUrls.apiUrl.concat("/main/get-why"), {})
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
      await this.http.post(apiUrls.apiUrl.concat("/main/get-work"), {})
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
      await this.http.post(apiUrls.apiUrl.concat("/main/get-privilege"), {})
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
      await this.http.post(apiUrls.apiUrl.concat("/main/get-advantage"), {})
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
      await this.http.post(apiUrls.apiUrl.concat("/main/category-list"), {})
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
}
