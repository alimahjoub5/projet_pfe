import { Component, OnInit } from '@angular/core';
import { EquipmentType } from '../core/models/equipement';
import { EquipmentTypeService } from '../core/services/equipements.service';
import {  AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { User } from '../core/models/User';
import { UserService } from '../core/services/user-service.service';
import { GroupeService } from '../core/services/groupe.service';
import { Groupe } from '../core/models/groupe';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  standalone : true,
  imports : [AutoCompleteModule,FormsModule]
})
export class TestComponent implements OnInit {
  Technicians: User[] | undefined;
  selectedTechnician: User | null = null;
  filteredTechnicians: User[] | undefined;

  Groupe: Groupe[] | undefined;
  selectedGroupe: Groupe | null = null;
  filteredGroupe: Groupe[] | undefined;

  constructor(private userService: UserService, private groupeservice: GroupeService) {}

  ngOnInit() {
    this.userService.getTechnicians().subscribe(
      (technicians: User[]) => {
        this.Technicians = technicians;
      },
      (error) => {
        console.error('Error fetching technicians:', error);
      }
    );
    //--------------groupe--------------------

    this.groupeservice.getAllGroupes().subscribe(
      (Groupe: Groupe[]) => {
        this.Groupe = Groupe;
      },
      (error) => {
        console.error('Error fetching technicians:', error);
      }
    );
  }

  filterTechnicians(event: any) {
    let filtered: User[] = [];
    let query = event.query;

    if (this.Technicians) {
      filtered = this.Technicians.filter((technician) =>
        technician.Username.toLowerCase().startsWith(query.toLowerCase())
      );
    }

    this.filteredTechnicians = filtered;
  }

  onTechnicianSelect(event: any) {
    this.selectedTechnician = event.value;
  }

  saveSelectedTechnician() {
    if (this.selectedTechnician) {
      // Vous pouvez enregistrer l'ID du technicien dans la base de données ici
      console.log('Selected Technician ID:', this.selectedTechnician.UserID);
    }
  }
//---------------------groupe--------------------------------
  filterGroupe(event: any) {
    let filtered: Groupe[] = [];
    let query = event.query;

    if (this.Groupe) {
      filtered = this.Groupe.filter((Groupe) =>
      Groupe.GroupName.toLowerCase().startsWith(query.toLowerCase())
      );
    }

    this.filteredGroupe = filtered;
  }

  onGroupeSelect(event: any) {
    this.selectedTechnician = event.value;
  }

  saveSelectedGroupe() {
    if (this.selectedTechnician) {
      // Vous pouvez enregistrer l'ID du technicien dans la base de données ici
      console.log('Selected Technician ID:', this.selectedTechnician.UserID);
    }
  }
}