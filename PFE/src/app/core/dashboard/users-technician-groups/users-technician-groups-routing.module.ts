import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListtComponent } from './listt/listt.component';
import { UpdateeComponent } from './updatee/updatee.component';
import { DetaillsComponent } from './detaills/detaills.component';

const routes: Routes = [
  {
    path: "add",
    component: AddComponent
  }, 
  {
    path: "listt",
    component: ListtComponent
  }, 
  {
    path: "updatee/:UserID/:GroupID",
    component: UpdateeComponent
  },
  {
    path: "detaills/:UserID/:GroupID",
    component: DetaillsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersTechnicianGroupsRoutingModule { }
