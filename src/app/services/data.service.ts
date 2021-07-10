import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
    aTasks: any[] = [];
    aTaskCategories: any[] = [];    
}