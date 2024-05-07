import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Ticket } from 'src/app/core/models/ticket';
import { TicketService } from 'src/app/core/services/tickets.service';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AssignTicketGroupComponent } from './assign-ticket-group/assign-ticket-group.component';
import { CommonModule } from '@angular/common';
import { AssignTicketTechnicianComponent } from './assign-ticket-technician/assign-ticket-technician.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TableModule,
    AssignTicketGroupComponent,
    DialogModule,
    AutoCompleteModule,
    RadioButtonModule,
    AssignTicketTechnicianComponent,
    NgxSpinnerModule

  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss',
  providers: [MessageService, ConfirmationService

  ],
})
export class PlanComponent {
  @ViewChild(AssignTicketGroupComponent) assignTicketGroupComponent: AssignTicketGroupComponent;
  @ViewChild(AssignTicketTechnicianComponent) AssignTicketTechnicianComponent: AssignTicketTechnicianComponent;

  selectedTicketId: string | undefined;


    tickets: Ticket[];
  isLoading: boolean;
  displayAssignDialog: boolean = false;
selectedAssignType: string;

  showAssignDialog(ticketId: string) {
    this.selectedTicketId = ticketId;
    this.displayAssignDialog = true;
  }


  hideAssignDialog(): void {
    this.displayAssignDialog = false;
  }
    constructor(
      private ticketService: TicketService,
      private messageService: MessageService,
      private spinner: NgxSpinnerService,
      private authservice:AuthService
    ) { }
    ngOnInit(): void {
      this.loadTickets();
    }
  
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

  //--------------------------------------------------------------
    
    getPriorityColor(priorityName: string): string {
      // Définissez les couleurs pour chaque priorité
      switch (priorityName.toLowerCase()) {
        case 'haute':
          return 'red'; // Rouge pour haute priorité
        case 'normale':
          return 'orange'; // Orange pour moyenne priorité
        case 'basse':
          return 'green'; // Vert pour basse priorité
        default:
          return 'black'; // Couleur par défaut pour les autres priorités
      }
    }

    onSubmit(event: Event) {
      if (this.selectedAssignType === 'technician') {
        this.AssignTicketTechnicianComponent.saveSelectedTechnician();
      } else if (this.selectedAssignType === 'group') {
        this.assignTicketGroupComponent.saveSelectedGroupe();
      }
      event.preventDefault(); // Empêcher le rafraîchissement de la page
      this.displayAssignDialog = false; // Masquer la boîte de dialogue
      this.loadTickets();
    }
    
    onCancel(event: Event) {
      // Réinitialiser les valeurs ou effectuer d'autres actions en cas d'annulation
      this.displayAssignDialog = false; // Cacher la boîte de dialogue
      // Autres actions d'annulation...
    }
  }
  

