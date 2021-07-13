import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { NgModule, OnInit } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { App } from "./app.component";
import { ContainerModule } from "./modules/container/container.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FooterModule } from "./modules/footer/footer.component";
import { RegisterModule } from "./modules/register/register.component";
import { LoginModule } from "./modules/login/login.component";
import { ParamInterceptor } from "./api-interceptor";
import { DataService } from "./services/data.service";
import { HeaderModule } from "./modules/header/header.component";
import { HeaderDropMenuModule } from "./modules/header-drop-menu/header-drop-menu.component";

@NgModule({
  declarations: [
    App,
    ContainerModule,
    FooterModule,
    RegisterModule,
    LoginModule,
    HeaderModule,
    HeaderDropMenuModule
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }
  ],

  bootstrap: [App]
})

export class AppModule implements OnInit {
  constructor (private dataService: DataService) { }

  public ngOnInit() { 
    this.dataService.bGuest = sessionStorage["role"] == "G" ? true : false;
    this.dataService.bCustomer = sessionStorage["role"] == "C" ? true : false;
    this.dataService.bExecutor = sessionStorage["role"] == "E" ? true : false;
    this.dataService.role = sessionStorage["role"];  
  };
}
