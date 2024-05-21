import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Ticket } from 'src/app/core/models/ticket';
import { TicketService } from 'src/app/core/services/tickets.service';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    TableModule,
    ButtonModule
  ],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss'
})
export class ArchiveComponent implements OnInit {
  archiveTickets: Ticket[] = [];
  allTickets: Ticket[] = [];
  selectedStatus: string = ''; // Statut sélectionné pour le filtrage

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getAllTickets().subscribe(
      (tickets: Ticket[]) => {
        this.allTickets = tickets;
        this.filterArchiveTickets(); // Appliquer le filtrage initial
      },
      (error) => {
        console.log('Error occurred while loading tickets:', error);
      }
    );
  }

  filterArchiveTickets() {
    if (this.selectedStatus) {
      this.archiveTickets = this.allTickets.filter(ticket => ticket.StatusCodeID === this.selectedStatus);
    } else {
      // Si aucun statut sélectionné, afficher tous les tickets
      this.archiveTickets = this.allTickets;
    }
  }

  // Méthode appelée lorsqu'un bouton de filtrage est cliqué
  filterByStatus(status: string) {
    this.selectedStatus = status;
    this.filterArchiveTickets();
  }
}