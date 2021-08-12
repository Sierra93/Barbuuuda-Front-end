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
import { ProfileBarModule } from "./modules/profile-bar/profile-bar.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NbThemeModule, NbLayoutModule, NbDatepickerModule, NbTimepickerModule, NbCalendarModule, NbDialogModule, NbCardModule } from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { MyTaskModule } from "./modules/my-tasks/my-tasks.component";
import { CreateTaskModule } from "./modules/create-task/create-task.component";
import { ViewTaskModule } from "./modules/view-task/view-task.component";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { MessagesModule } from "primeng/messages";
import { ToastModule } from "primeng/toast";
import { CalendarModule } from "primeng/calendar";
import { AuctionModule } from "./modules/auction/auction.component";
import { ProfileModule } from "./modules/profile/profile.component";
import { TabViewModule } from "primeng/tabview";
import { DropdownModule } from "primeng/dropdown";

@NgModule({
  declarations: [
    App,
    ContainerModule,
    FooterModule,
    RegisterModule,
    LoginModule,
    HeaderModule,
    HomeModule,
    ProfileBarModule,
    MyTaskModule,
    CreateTaskModule,
    ViewTaskModule,
    AuctionModule,
    ProfileModule
  ],

  entryComponents: [],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: "default" }),
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbDatepickerModule,
    NbCalendarModule,
    NbCardModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    MessagesModule,
    ToastModule,
    CalendarModule,
    TabViewModule,
    DropdownModule
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