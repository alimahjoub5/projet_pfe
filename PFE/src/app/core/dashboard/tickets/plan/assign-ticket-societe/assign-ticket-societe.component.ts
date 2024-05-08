import { Component, OnInit,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Societe } from 'src/app/core/models/societe';
import { SocieteService } from 'src/app/core/services/societe.service';
@Component({
  selector: 'app-assign-ticket-societe',
  standalone: true,
  imports: [AutoCompleteModule, FormsModule],
  templateUrl: './assign-ticket-societe.component.html',
  styleUrl: './assign-ticket-societe.component.scss'
})
export class AssignTicketSocieteComponent implements OnInit{
  @Input() ticketId: string | undefined;
  Societe: Societe[] | undefined;
  selectedSociete: Societe | null = null;
  filteredSociete: Societe[] | undefined;

  constructor( private societeservice: SocieteService) {}
  ngOnInit(): void {
    this.societeservice.getAllSocietes().subscribe(
      (Societe: Societe[]) => {
        this.Societe = Societe;
      },
      (error) => {
        console.error('Error fetching technicians:', error);
      }
    );
    console.log(this.ticketId);

  }
}

//---------------------groupe--------------------------------
//---------------------groupe--------------------------------
filterSociete(event: any) {
  let filtered: Societe[] = [];
  let query = event.query;

  if (this.Societe) {
    filtered = this.Societe.filter((Societe) =>
      Societe.name.toLowerCase().startsWith(query.toLowerCase())
    );
  }

  this.filteredSociete = filtered;
}

onSocieteSelect(event: any) {
  this.selectedSociete = event.value;
}

saveSelectedSociete() {
  if (this.selectedSociete && this.ticketId) {
    // Envoyer une requête pour affecter le ticket au groupe sélectionné
    this.societeservice.assignTicketToGroup(Number(this.ticketId), this.selectedSociete.SocieteID).subscribe(
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