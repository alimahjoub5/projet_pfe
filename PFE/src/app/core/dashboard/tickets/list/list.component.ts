import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import {RouterModule , ROUTES} from '@angular/router';
import { Ticket } from 'src/app/core/models/ticket';
import { TicketService } from 'src/app/core/services/tickets.service';
import { EquipmentTypeService } from 'src/app/core/services/equipements.service';
import { PriorityService } from 'src/app/core/services/priority.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    TableModule,
    ToolbarModule,
    RouterModule,
    CommonModule,
    NgxSpinnerModule,
    ToastModule
  ],
  templateUrl: './list.component.html',
  providers: [MessageService, ConfirmationService

],
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  tickets: Ticket[] = [];
isLoading: boolean;

//---------------------------------------------------------------

  constructor(private ticketService: TicketService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService

              ) { }

  

  //--------------------------------------------------------------------------------

              ngOnInit(): void {
    this.spinner.show(); // Show the spinner
    this.loadTickets();
  }

//---------------------------------------------------------------------------------------

  loadTickets() {
    this.isLoading=true;
    this.spinner.show(); // Show the spinner
    setTimeout(() => {
      this.ticketService.getAllTickets().subscribe(
        (tickets: Ticket[]) => {
          this.tickets = tickets;
        },
        (error) => {
          console.log('Error occurred while loading tickets:', error);
        }
      );
      this.spinner.hide(); // Hide the spinner when data is loaded
    }, 2000);
    this.isLoading=false;
  }

  //--------------------------------------------------------------------------------------

  getPriorityColor(priorityID: string): string {
    switch (priorityID) {
      case 'haute':
        return 'high-priority'; // classe CSS correspondant à haute priorité
      case 'normale':
        return 'normal-priority'; // classe CSS correspondant à priorité normale
      case 'basse':
        return 'low-priority'; // classe CSS correspondant à basse priorité
      default:
        return ''; // classe CSS par défaut ou vide si la priorité n'est pas définie
    }
  }
  
  

  getSeverity(statusCodeID: string): string {
    switch (statusCodeID) {
      case 'nouveau':
        return 'info'; // ou 'light', selon votre style
      case 'assigné':
        return 'warning';
      case 'en_cours':
        return 'primary';
      case 'résolu':
        return 'success';
      case 'fermé':
        return 'dark';
      default:
        return 'info'; // Valeur par défaut pour les cas non traités
    }
  }
  

  
  //--------------------------------------------------------------------------------------------
  
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Ticket supprimé avec succès' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de la suppression du ticket' });
  }
  //-------------------------------------------------------------------------------------------
  confirmDelete(ticket: Ticket): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce ticket ?');
    if (confirmation) {
      this.ticketService.deleteTicket(ticket.TicketID).subscribe(
        () => {
          this.spinner.show(); // Show the spinner
          this.loadTickets();
          this.showSuccess();


        },
        (error) => {
          // En cas d'erreur lors de la suppression
          this.showError();
          console.error('Erreur lors de la suppression du ticket : ', error);
        }
      );
    }
  }
}

