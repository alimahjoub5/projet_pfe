import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ArchiveComponent } from './archive/archive.component';
import { CreateComponent } from './create/create.component';
import { StatusComponent } from './status/status.component';
import { AuthGuard } from 'src/app/auth.guard';
import { UpdateticketsComponent } from './updatetickets/updatetickets.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';


const routes: Routes = [
  {
    path: "archive",
    component: ArchiveComponent,canActivate : [AuthGuard]
  },
  {
    path: "create",
    component: CreateComponent,canActivate : [AuthGuard]
  },
  {
    path: "list",
    component: ListComponent,
    canActivate : [AuthGuard]
  },
  /*{
    path: "plan",
    component: PlanComponent,canActivate : [AuthGuard]
  },*/
  {
    path: "status",
    component: StatusComponent,canActivate : [AuthGuard]
  },
  {
    path: "updatetickets/:TicketID",
    component: UpdateticketsComponent,canActivate : [AuthGuard]
  },
  {
    path: "ticket-details/:id",
    component: TicketDetailsComponent,canActivate : [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
