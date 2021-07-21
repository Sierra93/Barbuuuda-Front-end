import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CommonDataService } from "src/app/services/common-data.service";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: "header-drop-menu",
    templateUrl: "./header-drop-menu.component.html",
    styleUrls: ["./header-drop-menu.component.scss"]
})

export class HeaderDropMenuModule implements OnInit {
    bGuest: boolean = false;
    bCreateBtn: boolean = false;
    bHideHeader: boolean = false;
    balance: string = "";
    aHeader: any[] = [];
    bExecutor = false;
    bCustomer = false;    

    constructor(private http: HttpClient, private dataService: DataService, private commonService: CommonDataService, private router: Router) { };

    public async ngOnInit() {
        this.balance = this.dataService.getUserBalance();
        this.commonService.refreshToken();
                  
    };     

    public onGoProfile() {
        this.router.navigate(["/profile"]);
    };

    
}