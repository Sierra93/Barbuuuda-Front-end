import { Injectable } from '@angular/core';

// Класс общих данных приложения.
@Injectable()
export class DataService {
    private aHeader: any[] = [];
    private aTasks: any[] = [];
    private aTaskCategories: any[] = [];    
    private bGuest: boolean = false;
    private bCustomer: boolean = false;
    private bExecutor: boolean = false;
    private dateRegister: string = "";
    private role: string = "";
    private bHideHeader: boolean = false;
    private oEditTask: any = {
        editTask: {},
        oTypes: {
            All: "All",
            Single: "Single"
        },
        bEdit: false
    };
    private balance: string = "0";    
    taskId: number = 0;

    constructor() { }

    // Функция запишет поля хидера.
    public setHeaderFields(headerField: any) {
        this.aHeader.push(headerField);       
    };

    // Функция получит поля хидера.
    public getHeaderFields() {
        return this.aHeader;
    };

    // Функция запишет список заданий.
    public setTasksList(tasks: any) {
        tasks.forEach((el: any) => {
            this.aTasks.push(el);
        });
    };

    // Функция получит список заданий.
    public getTasksList() {
        return this.aTasks;
    };

    // Функция запишет роль пользователя.
    public setUserRole(role: string) {
        this.role = role;
    };

    // Функция получит роль пользователя.
    public getUserRole(): string {
        return this.role;
    };

    // Функция запишет список категорий заданий.
    public setTaskCategories(taskCategories: any) {
        taskCategories.forEach((el: any) => {
            this.aTaskCategories.push(el);
        });     
    };

    // Функция получит список категорий заданий.
    public getTaskCategories() {
        return this.aTaskCategories;
    };

    // Функция запишет дату регистрации.
    public setDateRegister(date: string) {
        this.dateRegister = date;
    };

    // Функция получит дату регистрации.
    public getDateRegister() {
        return this.dateRegister;
    };

    // Функция получит баланс счета сервиса пользователя.
    public getUserBalance() {
        return this.balance;
    };

    // Функция запишет баланс счета сервиса пользователя.
    public setUserBalance(balance: string) {
        this.balance = balance;
    };

    // Функция запишет роль гостя.
    public setGuestUserRole(role: boolean) {
        this.bGuest = role;
    };

    // Функция получит роль гостя.
    public getGuestUserRole() {
        return this.bGuest;
    };

    // Функция запишет роль исполнителя.
    public setExecutorUserRole(role: boolean) {
        this.bExecutor = role;
    };

    // Функция получит роль исполнителя.
    public getExecutorUserRole() {
        return this.bExecutor;
    };

    // Функция запишет роль заказчика.
    public setCustomerUserRole(role: boolean) {
        this.bCustomer = role;
    };

    // Функция получит роль заказчика.
    public getCustomerUserRole() {
        return this.bCustomer;
    };

    // Функция получит статус хидера.
    public getHeaderStatus() {
        return this.bHideHeader;
    };

    // Функция запишет статус хидера.
    public setHeaderStatus(status: boolean) {
        this.bHideHeader = status;
    };

    // Функция запишет флаг редактируемости задания.
    public setIsEditTask(bEdit: boolean) {
        this.oEditTask.bEdit = bEdit;
    };

    // Функция получит флаг редактируемости задания.
    public getIsEditTask() {
        return this.oEditTask.bEdit;
    };
};