import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule, ButtonModule
  ]
})
export class DashboardModule { }
