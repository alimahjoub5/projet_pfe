
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquipmentType } from 'src/app/core/models/equipement'; // Assurez-vous que le chemin d'importation est correct
import { EquipmentTypeService } from 'src/app/core/services/equipements.service'; // Assurez-vous que le chemin d'importation est correct
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-ajoutereq',
 
  templateUrl: './ajoutereq.component.html',
  styleUrls: ['./ajoutereq.component.scss'],

  standalone : true,
  imports : [ReactiveFormsModule,DropdownModule,CheckboxModule  ]
})
export class AjoutereqComponent implements OnInit{
  equipmentForm: FormGroup;

  constructor(private fb: FormBuilder, private equipmentService: EquipmentTypeService,
    private authservice : AuthService) {
    this.equipmentForm = this.fb.group({
      TypeName: ['', Validators.required],
      Description: [''],
      Manufacturer: [''],
      ModelNumber: [''],
      SerialNumber: [''],
      InstallationDate: [''],
      WarrantyExpiration: [''],
      MaintenanceInterval: [''],
      LastMaintenanceDate: [''],
      CreatedBy: [1],
      CreatedOn: [''],
      ModifiedBy: [1],
      ModifiedOn: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.equipmentForm.invalid) {
      return;
    }

    const equipmentData = this.equipmentForm.value;
    const equipment: EquipmentType = { // Assurez-vous que le nom du modèle est correct
      TypeName: equipmentData.TypeName,
      Description: equipmentData.Description,
      Manufacturer: equipmentData.Manufacturer,
      ModelNumber: equipmentData.ModelNumber,
      SerialNumber: equipmentData.SerialNumber,
      InstallationDate: equipmentData.InstallationDate,
      WarrantyExpiration: equipmentData.WarrantyExpiration,
      MaintenanceInterval: equipmentData.MaintenanceInterval,
      LastMaintenanceDate: equipmentData.LastMaintenanceDate,
      CreatedBy: Number(this.authservice.getUserID()),
      CreatedOn: null,
      ModifiedBy: null,
      ModifiedOn: null
    };

    this.equipmentService.addEquipmentType(equipment) // Assurez-vous que le nom du service est correct
      .subscribe(
        response => {
          console.log('Equipment added successfully:', response);
          this.equipmentForm.reset();
        },
        error => {
          console.error('Error adding equipment:', error);
        }
      );
  }
}