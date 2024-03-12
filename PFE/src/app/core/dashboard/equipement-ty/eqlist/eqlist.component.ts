import { Component , OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MenuItem} from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {RouterModule} from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { EquipmentType } from 'src/app/core/models/equipement';
import { EquipmentTypeService } from 'src/app/core/services/equipements.service';

@Component({
  selector: 'app-eqlist',
  templateUrl: './eqlist.component.html',
  styleUrls: ['./eqlist.component.scss'],
   
  standalone: true,
  imports: [FormsModule,
    ButtonModule,
     ReactiveFormsModule, 
    AutoCompleteModule,
    TableModule,DialogModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    SplitButtonModule,
    RouterModule,
    NgxSpinnerModule,
CommonModule],
})
export class EqlistComponent implements OnInit {

  equipments: EquipmentType[];
  isLoading: boolean;

  constructor(
    private equipmentService: EquipmentTypeService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadEquipments();
  }

  loadEquipments(): void {
    this.isLoading = true;
    this.spinner.show(); // Afficher le spinner avant de récupérer les données

    this.equipmentService.getAllEquipmentTypes().subscribe(
      equipments => {
        this.equipments = equipments;
        this.isLoading = false;
        this.spinner.hide(); // Masquer le spinner après le chargement des données
      },
      error => {
        console.error('Erreur lors du chargement des équipements :', error);
        this.isLoading = false;
        this.spinner.hide(); // Assurez-vous de cacher le spinner en cas d'erreur
      }
    );
  }

  deleteEquipment(equipmentTypeId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet équipement ?')) {
      this.equipmentService.deleteEquipmentType(equipmentTypeId).subscribe(() => {
        this.loadEquipments(); // Recharger la liste des équipements après la suppression
      });
    }
  }

}
