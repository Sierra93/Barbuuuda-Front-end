import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { NgModule } from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
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
import { FormatPipe } from "./core/pipes/format-date.pipe";
import { EditTaskModule } from "./modules/edit-task/edit-task.component";
import { RemoveSpacePipe } from "./core/pipes/remove-space.pipe";
import { PaginatorModule } from "primeng/paginator";
import { PaymentModule } from "./modules/payment/payment.component";
import {RadioButtonModule} from "primeng/radiobutton";

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
    ProfileModule,
    EditTaskModule,
    FormatPipe,
    RemoveSpacePipe,
    PaymentModule
  ],

  entryComponents: [],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbEvaIconsModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    MessagesModule,
    ToastModule,
    CalendarModule,
    TabViewModule,
    DropdownModule,
    PaginatorModule,
    RadioButtonModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    },
    CommonDataService,
    DataService,
    ParamInterceptor,
    Title 
  ],

  bootstrap: [App]
})

export class AppModule { }