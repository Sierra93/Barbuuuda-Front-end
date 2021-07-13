import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
    aTasks: any[] = [];
    aTaskCategories: any[] = [];    
    bGuest: boolean = false;
    bCustomer: boolean = false;
    bExecutor: boolean = false;
    dateRegister: string = "";
    role: string = "";
    bHideHeader: boolean = false;
    aHeader: string[] = [];
    oEditTask: any = {
        editTask: {},
        oTypes: {
            All: "All",
            Single: "Single"
        },
        bEdit: false
    };
    balance: string = "0";
}