import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { EquipmentTypeService } from 'src/app/core/services/equipements.service';
import { EquipmentType } from 'src/app/core/models/equipement';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-update-eq',
  standalone: true,
  imports: [ReactiveFormsModule,
    DropdownModule,
    CheckboxModule,   
     NgxSpinnerModule,
     DialogModule,
     AutoCompleteModule,
     ReactiveFormsModule,
     FormsModule,
     ToastModule,
     CommonModule,
   ToastModule,],
  templateUrl: './update-eq.component.html',
  styleUrl: './update-eq.component.scss'
})
export class UpdateEqComponent {

  equipementtype: EquipmentType ;
  EquipmentTypeID: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private Equipmenttypeservice: EquipmentTypeService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.EquipmentTypeID = params.get('EquipmentTypeID');
      this.Equipmenttypeservice.getEquipmentTypeById(Number(this.EquipmentTypeID)).subscribe(equipementtype => {
        this.equipementtype = equipementtype;
      });
    });
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'equipement a été modifié avec succès' });

  }
  updateEquipmentType(): void {
    this.Equipmenttypeservice.updateEquipmentType(Number(this.EquipmentTypeID),this.equipementtype).subscribe(updateEquipmentType => {
      console.log('Equipement updated successfully:', updateEquipmentType);
      this.spinner.hide();
      this.showSuccess();
      // Rediriger vers la page de détails de l'utilisateur mis à jour
    });

  }


}
