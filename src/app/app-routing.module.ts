import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { App } from "./app.component";
import { RegisterModule } from "./modules/register/register.component";
import { ContainerModule } from "./modules/container/container.component";
import { LoginModule } from "./modules/login/login.component";
import { HomeModule } from "./modules/home/home.component";
import { MyTaskModule } from "./modules/my-tasks/my-tasks.component";
import { ViewTaskModule } from "./modules/view-task/view-task.component";
import { CreateTaskModule } from "./modules/create-task/create-task.component";
import { EditTaskModule } from "./modules/edit-task/edit-task.component";
import { AuctionModule } from "./modules/auction/auction.component";

const routes: Routes = [
  {
    path: "",
    component: ContainerModule
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
  },

  {
    path: "tasks/my",
    component: MyTaskModule
  },

  {
    path: "task/create",
    component: CreateTaskModule
  },

  {
    path: "task/view",
    component: ViewTaskModule
  },

  {
    path: "task/edit",
    component: EditTaskModule
  },

  {
    path: "auction",
    component: AuctionModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [App]
})

export class AppRoutingModule { }
