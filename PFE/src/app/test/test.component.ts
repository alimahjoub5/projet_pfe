import { Component } from '@angular/core';
import { EquipmentTypeService } from '../core/dashboard/services/equipment-type-id.ts.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { EquipmentType } from '../core/dashboard/classes/equipmentTypeID';

@Component({
  selector: 'autocomplete-basic-demo',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  standalone : true,
  imports: [DropdownModule, FormsModule]
})
export class TestComponent {
  equipement: EquipmentType[] = []; // Assuming cities will hold the equipment names
  selectedCity: EquipmentType; // Assuming selectedCity will hold the selected equipment name

  constructor(private equipmentTypeService: EquipmentTypeService) { }

  ngOnInit(): void {
    this.equipmentTypeService.getAllEquipmentTypes().subscribe(
      (response: any[]) => {
        if (Array.isArray(response)) {
          // Utilisez simplement la réponse telle quelle
          this.equipement = response;
        } else {
          console.error('Error fetching equipment types: Invalid response format');
        }
      },
      (error) => {
        console.error('Error fetching equipment types:', error);
      }
    );
  }
}

