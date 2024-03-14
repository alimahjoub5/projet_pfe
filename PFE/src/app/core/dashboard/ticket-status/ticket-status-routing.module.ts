import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListstatusComponent } from './liststatus/liststatus.component';
import { CreateticketstatutComponent } from './createticketstatut/createticketstatut.component';
import { StatusDetailComponent } from './status-detail/status-detail.component';

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
    component: StatusDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketStatusRoutingModule { }
