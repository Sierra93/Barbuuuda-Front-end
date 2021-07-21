import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { NgModule } from "@angular/core";
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
import { HeaderModule } from "./modules/header/header.component";
import { HomeModule } from "./modules/home/home.component";
import { CommonDataService } from "./services/common-data.service";
import { DataService } from "./services/data.service";

@NgModule({
  declarations: [
    App,
    ContainerModule,
    FooterModule,
    RegisterModule,
    LoginModule,
    HeaderModule,  
    HomeModule
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    },
    CommonDataService,
    DataService,
    ParamInterceptor
  ],

  bootstrap: [App]
})

export class AppModule { }