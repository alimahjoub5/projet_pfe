import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ArchiveComponent } from './archive/archive.component';
import { CreateComponent } from './create/create.component';
import { StatusComponent } from './status/status.component';
import { PlanComponent } from './plan/plan.component';


const routes: Routes = [
  {
    path: "archive",
    component: ArchiveComponent
  },
  {
    path: "create",
    component: CreateComponent
  },
  {
    path: "list",
    component: ListComponent
  },
  {
    path: "plan",
    component: PlanComponent
  },
  {
    path: "status",
    component: StatusComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
