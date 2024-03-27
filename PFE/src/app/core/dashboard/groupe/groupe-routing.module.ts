import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupelistComponent } from './groupelist/groupelist.component';
import { AjouterComponent } from './ajoutergrp/ajoutergrp.component';
import { GroupeDetailComponent } from './groupe-detail/groupe-detail.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: 'groupelist',
    component: GroupelistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ajoutergrp',
    component: AjouterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'groupe-detail/:id',
    component: GroupeDetailComponent,
    canActivate: [AuthGuard]
  },
 // {
   // path: 'updategrp/:GroupID',
   // component: UpdategrpComponent,
   // canActivate: [AuthGuard]
  //},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupeRoutingModule { }
