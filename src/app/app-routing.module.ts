import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { App } from "./app.component";
import { RegisterModule } from "./modules/register/register.component";
import { BrowserModule } from "@angular/platform-browser";
import { ContainerModule } from "./modules/container/container.component";
import { LoginModule } from "./modules/login/login.component";
import { HomeModule } from "./modules/home/home.component";

const routes: Routes = [
  {
    path: "",
    component: ContainerModule,
  },

  {
    path: "register",
    component: RegisterModule
  },

  {
    path: "login",
    component: LoginModule
  },

  {
    path: "home",
    component: HomeModule
  }
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [App]
})

export class AppRoutingModule { }
