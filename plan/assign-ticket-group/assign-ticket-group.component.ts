import { Component, OnInit,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Groupe } from 'src/app/core/models/groupe';
import { GroupeService } from 'src/app/core/services/groupe.service';

@Component({
  selector: 'app-assign-ticket-group',
  standalone: true,
  imports: [AutoCompleteModule, FormsModule
  ],
  templateUrl: './assign-ticket-group.component.html',
  styleUrl: './assign-ticket-group.component.scss'
})
export class AssignTicketGroupComponent implements OnInit {
  @Input() ticketId: string | undefined;
  Groupe: Groupe[] | undefined;
  selectedGroupe: Groupe | null = null;
  filteredGroupe: Groupe[] | undefined;

  constructor( private groupeservice: GroupeService) {}
  ngOnInit(): void {
    this.groupeservice.getAllGroupes().subscribe(
      (Groupe: Groupe[]) => {
        this.Groupe = Groupe;
      },
      (error) => {
        console.error('Error fetching technicians:', error);
      }
    );
    console.log(this.ticketId);

  }

  
//---------------------groupe--------------------------------
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
  this.selectedGroupe = event.value;
}

saveSelectedGroupe() {
  if (this.selectedGroupe && this.ticketId) {
    // Envoyer une requête pour affecter le ticket au groupe sélectionné
    this.groupeservice.assignTicketToGroup(Number(this.ticketId), this.selectedGroupe.GroupID).subscribe(
      response => {
        console.log('Ticket assigned to group successfully:', response);
        // Vous pouvez ajouter d'autres actions ici, comme afficher un message de réussite ou rediriger l'utilisateur vers une autre page.
      },
      error => {
        console.error('Error assigning ticket to group:', error);
        // Vous pouvez gérer les erreurs ici, comme afficher un message d'erreur à l'utilisateur.
      }
    );
  } else {
    console.warn('No ticket or group selected.');
    // Vous pouvez gérer le cas où aucun ticket ou groupe n'est sélectionné, comme afficher un message à l'utilisateur pour sélectionner un groupe.
  }
}

}