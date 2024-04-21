import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { PieceFormComponent } from './crudpiece/addpiece/piece.component';
import { ConfirmationService } from 'primeng/api/public_api';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PieceFormComponent, ButtonModule,ChartModule
  ],
  providers: [ConfirmationService]
})
export class StocksModule { }
