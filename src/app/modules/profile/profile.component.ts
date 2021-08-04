import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})

export class ProfileModule implements OnInit {
    checked: boolean = false;
    dateRegister: string = "";
    oProfileData: any = {};
    aCategories: any = [];
    bMale: string = "";
    bFemale: string = "";
    iDefaultScore: string = "150";
    bErrorScore: boolean = false;
    aExecutorSpecializations: any = [];
    firstName: string = "";
    lastName: string = "";
    patronymic: string = "";
    city: string = "";
    userEmail: string = "";
    gender: string = "";
    role: string = "";

    constructor(private http: HttpClient, private commonService: CommonDataService, private router: Router) { }

    public async ngOnInit() {
        await this.loadProfileAsync();
        await this.loadCategoryListAsync();
        await this.checkUserRoleAsync();
    };

    // Функция загрузит всю информацию профиля.
    private async loadProfileAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/user/profile"), {})
                .subscribe({
                    next: (response: any) => {
                        this.oProfileData = response;
                        this.dateRegister = response.dateRegister.split(".")[0];
                        console.log("Данные профиля", this.oProfileData);
                    },

                    error: (err: any) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e) {
            throw new Error(e);
        }
    };

    // Функция выгрузит список категорий заданий.
    private async loadCategoryListAsync() {
        try {
            await this.commonService.getTaskCategoriesAsync().then((data: any) => {
                this.aCategories = data;
            });
        }

        catch (e) {
            throw new Error(e);
        }
    };

    // Функция сохранит личные данные.
    public async onSaveDataAsync() {
        try {
            // TODO: эти поля забиндить через ngmodel во вьюхе и передавать в функцию через параметры!!!
            let params = {
                FirstName: this.firstName,
                LastName: this.lastName,
                Patronymic: this.patronymic,
                City: this.city,
                UserEmail: this.userEmail,
                Gender: this.bMale || this.bFemale
            };

            await this.http.post(API_URL.apiUrl.concat("/user/save-data"), params)
                .subscribe({
                    next: (response: any) => {
                        console.log("Личные данные успешно сохранены");
                    },

                    error: (err: any) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e) {
            throw new Error(e);
        }
    };

    // Функция проставит выбранный пол.
    public onSelectGender(gender: string) {
        if (gender == "male") {
            this.bMale = "M";
        }

        if (gender == "female") {
            this.bFemale = "F";
        }
    };

    // Функция проверит введенную сумму.
    public onCheckScore() {
        if (this.iDefaultScore == "") {
            this.iDefaultScore = "0";
            this.bErrorScore = true;

            return;
        }

        if (this.iDefaultScore < "150") {
            this.bErrorScore = true;
            return;
        }

        this.bErrorScore = false;
    };

    // Функция добавит специализацию.
    public onSelectSpec(bCheck: boolean, specName: string) {
        if (bCheck) {
            // Добавит специализацию в массив.
            this.aExecutorSpecializations.push({ SpecName: specName });
            console.log("checked true", this.aExecutorSpecializations);
            return;
        }
        console.log("checked false");
    };

    // Функция сохранит выбранные специализации исполнителя.
    public async onSaveSpecies() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/executor/add-spec"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Специализации сохранены");
                    },

                    error: (err: any) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e) {
            throw new Error(e);
        }
    };

    // Функция перейдет на страницу оплаты.
    public onRouteRefillOrder() {
        this.router.navigate(["/payment"]);
    };

    private async checkUserRoleAsync() {   
        await this.commonService.getUserRoleAsync().then((data: any) => {
            this.role = data.userRole;
            sessionStorage["role"] = data.userRole;
         });    
    }; 
}