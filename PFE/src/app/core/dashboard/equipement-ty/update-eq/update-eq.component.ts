import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class UpdateEqComponent implements OnInit {

  equipementtype: EquipmentType;
  EquipmentTypeID: string;
  updateForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private equipmentTypeService: EquipmentTypeService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      TypeName: ['', Validators.required],
      Description: ['', Validators.required],
      Manufacturer: ['', Validators.required],
      ModelNumber: ['', Validators.required],
      SerialNumber: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      this.EquipmentTypeID = params.get('EquipmentTypeID');
      this.equipmentTypeService.getEquipmentTypeById(Number(this.EquipmentTypeID)).subscribe(equipementtype => {
        this.equipementtype = equipementtype;
        this.updateForm.patchValue({
          TypeName: this.equipementtype.TypeName,
          Description: this.equipementtype.Description,
          Manufacturer: this.equipementtype.Manufacturer,
          ModelNumber: this.equipementtype.ModelNumber,
          SerialNumber: this.equipementtype.SerialNumber
        });
      });
    });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Équipement mis à jour avec succès' });
  }

  updateEquipmentType(): void {
    if (this.updateForm.valid) {
      const updatedEquipmentType: EquipmentType = {
        ...this.equipementtype,
        ...this.updateForm.value
      };

      this.equipmentTypeService.updateEquipmentType(Number(this.EquipmentTypeID), updatedEquipmentType).subscribe(() => {
        console.log('Équipement mis à jour avec succès');
        this.spinner.hide();
        this.showSuccess();
        // Rediriger vers la page de détails de l'utilisateur mis à jour
      });
    }
  }
}