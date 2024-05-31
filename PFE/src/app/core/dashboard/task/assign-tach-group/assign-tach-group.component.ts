import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Groupe } from 'src/app/core/models/groupe';
import { GroupeService } from 'src/app/core/services/groupe.service';
@Component({
  selector: 'app-assign-tach-group',
  standalone: true,
  imports: [AutoCompleteModule, FormsModule],
  templateUrl: './assign-tach-group.component.html',
  styleUrl: './assign-tach-group.component.scss'
})
export class AssignTachGroupComponent implements OnInit {
  @Output() groupeSelected = new EventEmitter<Groupe>();

  groupes: Groupe[] | undefined;
  selectedGroupe: Groupe | null = null;
  filteredGroupes: Groupe[] | undefined;
  selectedSociete: any;

  constructor(private groupeService: GroupeService) {}

  ngOnInit(): void {
    this.groupeService.getAllGroupes().subscribe(
      (groupes: Groupe[]) => {
        this.groupes = groupes;
        console.log(groupes);
      },
      (error) => {
        console.error('Erreur lors de la récupération des groupes :', error);
      }
    );
    
  }

  onGroupeSelect(event: any) {
    this.selectedSociete = event.value;
    this.groupeSelected.emit(this.selectedSociete); // Émettre la valeur sélectionnée vers le parent
  }

  filterGroupes(event: any) {
    let filtered: Groupe[] = [];
    let query = event.query;

    if (this.groupes) {
      filtered = this.groupes.filter((groupe) =>
        groupe.GroupName.toLowerCase().startsWith(query.toLowerCase())
      );
    }

    this.filteredGroupes = filtered;
  }

  saveSelectedGroupe() {
    // Ajoutez votre logique de sauvegarde ici
  }
}
