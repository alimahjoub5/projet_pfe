import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrioritylistComponent } from './prioritylist/prioritylist.component';
import { CreatepriorityComponent } from './createpriority/createpriority.component';
import { PriorityDetailsComponent } from './priority-details/priority-details.component';
import { PriorityupdateComponent } from './priorityupdate/priorityupdate.component';

const routes: Routes = [
  {
    path: "prioritylist",
    component: PrioritylistComponent
  },
  {
    path: "createpriority",
    component: CreatepriorityComponent
  },
  {
    path: "priority-details/:id",
    component: PriorityDetailsComponent
  },
{
   path: "priorityupdate/:PriorityID",
   component: PriorityupdateComponent
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriorityRoutingModule { }
