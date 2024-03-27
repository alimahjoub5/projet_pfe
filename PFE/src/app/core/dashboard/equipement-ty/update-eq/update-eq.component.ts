/*import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { EquipmentTypeService } from 'src/app/core/services/equipements.service';
import { EquipmentType } from 'src/app/core/models/equipement';
@Component({
  selector: 'app-update-eq',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './update-eq.component.html',
  styleUrl: './update-eq.component.scss'
})
export class UpdateEqComponent {

  equipementtype: EquipmentType = new EquipmentType;
  EquipmentTypeID: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private Equipmenttypeservice: EquipmentTypeService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.EquipmentTypeID = params.get('EquipmentTypeID');
      this.Equipmenttypeservice.getEquipmentTypeById(Number(this.EquipmentTypeID)).subscribe(equipementtype => {
        this.equipementtype = equipementtype;
      });
    });
  }

  updateEquipmentType(): void {
    this.Equipmenttypeservice.updateEquipmentType(this.equipementtype,this.EquipmentTypeID).subscribe(updateEquipmentType => {
      console.log('Equipement updated successfully:', updateEquipmentType);
      // Rediriger vers la page de détails de l'utilisateur mis à jour
      this.router.navigate(['equipement-detail/', this.EquipmentTypeID]);
    });
  }


}
*/