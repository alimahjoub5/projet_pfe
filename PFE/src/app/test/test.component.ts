import { Component, OnInit } from '@angular/core';
import { EquipmentType } from '../core/models/equipement';
import { EquipmentTypeService } from '../core/services/equipements.service';
import {  AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  standalone : true,
  imports : [AutoCompleteModule,FormsModule]
})
export class TestComponent implements OnInit {
    equipmentTypes: EquipmentType[] | undefined;
    selectedEquipmentType: EquipmentType | null = null;
    filteredEquipmentTypes: EquipmentType[] | undefined;
  
    constructor(private equipmentService: EquipmentTypeService) {}
  
    ngOnInit() {
      this.equipmentService.getAllEquipmentTypes().subscribe(
        (equipmentTypes: EquipmentType[]) => {
          this.equipmentTypes = equipmentTypes;
        },
        (error) => {
          console.error('Error fetching equipment types:', error);
        }
      );
    }
  
    filterEquipmentTypes(event: any) {
      let filtered: EquipmentType[] = [];
      let query = event.query;
  
      if (this.equipmentTypes) {
        filtered = this.equipmentTypes.filter((equipmentType) =>
          equipmentType.TypeName.toLowerCase().startsWith(query.toLowerCase())
        );
      }
  
      this.filteredEquipmentTypes = filtered;
    }
  
    onEquipmentTypeSelect(event: any) {
      this.selectedEquipmentType = event.value;
    }
  
    saveSelectedEquipmentType() {
      if (this.selectedEquipmentType) {
        // Here you can save the equipment ID into the database
        console.log('Selected Equipment ID:', this.selectedEquipmentType.EquipmentTypeID);
      }
    }
  }