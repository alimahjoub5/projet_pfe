import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from '../components/tickets/tickets.component';


const routes: Routes = [
  { path: 'tickets', component: TicketsComponent },
  { path: '', redirectTo: '/tickets', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
