import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsocieteComponent } from './listsociete/listsociete.component';
import { AddsocieteComponent } from './addsociete/addsociete.component';
import { UpdatesocieteComponent } from './updatesociete/updatesociete.component';
import { SocietedetailsComponent } from './societedetails/societedetails.component';

const routes: Routes = [
  {
    path: "listsociete",
    component: ListsocieteComponent
  },
  {
    path: "addsociete",
    component: AddsocieteComponent
  },
  {
    path: "updatesociete/:id",
    component: UpdatesocieteComponent
  },
  {
    path: "societedetails/:id",
    component: SocietedetailsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocieteRoutingModule { }
