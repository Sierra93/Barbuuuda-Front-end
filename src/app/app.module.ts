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
import { HttpClientModule } from "@angular/common/http";
import { FooterModule } from "./modules/footer/footer.component";
import { RegisterModule } from "./modules/register/register.component";
import { LoginModule } from "./modules/login/login.component";

@NgModule({
  declarations: [
    App,
    ContainerModule,
    FooterModule,
    RegisterModule,
    LoginModule
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [],

  bootstrap: [App]
})

export class AppModule implements OnInit {
  ngOnInit() { }
}
