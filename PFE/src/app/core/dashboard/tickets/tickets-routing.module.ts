import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ArchiveComponent } from './archive/archive.component';
import { CreateComponent } from './create/create.component';
import { StatusComponent } from './status/status.component';
import { PlanComponent } from './plan/plan.component';
import { AuthGuard } from 'src/app/auth.guard';


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
  {
    path: "plan",
    component: PlanComponent,canActivate : [AuthGuard]
  },
  {
    path: "status",
    component: StatusComponent,canActivate : [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
