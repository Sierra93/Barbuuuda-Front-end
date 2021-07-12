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
}