import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from 'src/app/auth.guard';
import { ChatComponent } from './chat/chat.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  { path: "about", component: AboutComponent ,canActivate : [AuthGuard]},
  {path : "chat", component: ChatComponent,canActivate : [AuthGuard]},
  {path : "profil", component: ProfilComponent,canActivate : [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
