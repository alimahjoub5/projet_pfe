import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Societe } from 'src/app/core/models/societe';
import { SocieteService } from 'src/app/core/services/societe.service';

@Component({
  selector: 'app-assign-ticket-societe',
  templateUrl: './assign-ticket-societe.component.html',
  styleUrls: ['./assign-ticket-societe.component.scss'],
  standalone:true,
  imports:[AutoCompleteModule, FormsModule
  ],
})
export class AssignTicketSocieteComponent implements OnInit {
  @Input() ticketId: string | undefined;
  societes: Societe[] | undefined;
  selectedSociete: Societe | null = null;
  filteredSocietes: Societe[] | undefined;

  constructor(private societeService: SocieteService) {}

  ngOnInit(): void {
    this.societeService.getAllSocietes().subscribe(
      (societes: Societe[]) => {
        this.societes = societes;
      },
      (error) => {
        console.error('Error fetching societes:', error);
      }
    );
    console.log(this.ticketId);
  }

  filterSocietes(event: any) {
    let filtered: Societe[] = [];
    let query = event.query;

    if (this.societes) {
      filtered = this.societes.filter((societe) =>
        societe.name.toLowerCase().startsWith(query.toLowerCase())
      );
    }

    this.filteredSocietes = filtered;
  }

  onSocieteSelect(event: any) {
    this.selectedSociete = event.value;
  }

  saveSelectedSociete() {
    if (this.selectedSociete && this.ticketId) {
      this.societeService.assignTicketToSociete(Number(this.ticketId), this.selectedSociete.SocieteID).subscribe(
        response => {
          console.log('Ticket assigned to soc successfully:', response);
        },
        error => {
          console.error('Error assigning ticket to soc:', error);
        }
      );
    } else {
      console.warn('No ticket or group selected.');
    }
  }
}
