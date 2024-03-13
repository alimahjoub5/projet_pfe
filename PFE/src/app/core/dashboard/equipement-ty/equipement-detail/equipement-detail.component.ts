
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentType } from 'src/app/core/models/equipement'; // Assurez-vous que le chemin d'importation est correct
import { EquipmentTypeService } from 'src/app/core/services/equipements.service'; // Assurez-vous que le chemin d'importation est correct
@Component({
  selector: 'app-equipement-detail',
  standalone: true,
  imports: [],
  templateUrl: './equipement-detail.component.html',
  styleUrl: './equipement-detail.component.scss'
})
export class EquipementDetailComponent implements OnInit{
  EquipmentTypeID: number;
  equipment: EquipmentType;
  isLoading = false;

  constructor(private route: ActivatedRoute, private equipmentTypeService: EquipmentTypeService) { }

  ngOnInit(): void {
    this.EquipmentTypeID = +this.route.snapshot.paramMap.get('id');
    this.getEquipmentDetails(this.EquipmentTypeID);
  }

  getEquipmentDetails(EquipmentTypeID: number): void {
    this.isLoading = true; // Afficher le spinner avant de récupérer les données
    this.equipmentTypeService.getEquipmentTypeById(EquipmentTypeID).subscribe(equipment => {
      this.equipment = equipment;
      this.isLoading = false; // Cacher le spinner après la récupération des données
    });
  }

  printDocument(): void {
    window.print();
  }


}

 