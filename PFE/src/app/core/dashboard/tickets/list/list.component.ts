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
              private equipmentService: EquipmentTypeService,
              private priorityService: PriorityService,
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

  

  getSeverity(statusCodeID: number): string {
    // Logic to determine severity based on status code ID
    return ''; // Return appropriate severity string
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

