import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateticketstatutComponent } from './createticketstatut/createticketstatut.component';
import { ListstatusComponent } from './liststatus/liststatus.component';
import { StatusdetailComponent } from './statusdetail/statusdetail.component';

const routes: Routes = [
  {
    path: "liststatus",
    component: ListstatusComponent 
  },
  {
    path: "createticketstatut",
    component: CreateticketstatutComponent 
  },
  {
    path: "statut-detail/:id",
    component: StatusdetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketStatusRoutingModule { }
