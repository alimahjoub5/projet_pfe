import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "profil",
    component: ProfilComponent
  },
  { path: "resetpassword", 
  component: ResetPasswordComponent
 },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
