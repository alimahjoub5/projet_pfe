import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListtasksComponent } from './listtasks/listtasks.component';
import { UpdatetasksComponent } from './updatetasks/updatetasks.component';
import { CreatetasksComponent } from './createtasks/createtasks.component';
import { TasksDetailsComponent } from './tasks-details/tasks-details.component';

const routes: Routes = [
  {
    path: "listtasks",
    component: ListtasksComponent
  },
  {
    path: "createtasks",
    component: CreatetasksComponent 
  },
  {
    path: "updatetasks/:TicketTaskID",
    component: UpdatetasksComponent
  },
  {
    path: "tasks-details/:TicketTaskID",
    component: TasksDetailsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
