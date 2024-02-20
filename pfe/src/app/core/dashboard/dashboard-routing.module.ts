import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TicketsComponent } from './tickets/tickets.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  { path: "about", component: AboutComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
