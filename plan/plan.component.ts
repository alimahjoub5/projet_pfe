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
import { AssignTicketSocieteComponent } from './assign-ticket-societe/assign-ticket-societe.component';

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
    NgxSpinnerModule,
    AssignTicketSocieteComponent

  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss',
  providers: [MessageService, ConfirmationService

  ],
})
export class PlanComponent {
  
  @ViewChild(AssignTicketGroupComponent) assignTicketGroupComponent: AssignTicketGroupComponent | undefined;
  @ViewChild(AssignTicketTechnicianComponent) assignTicketTechnicianComponent: AssignTicketTechnicianComponent | undefined;
  @ViewChild(AssignTicketSocieteComponent) assignTicketSocieteComponent: AssignTicketSocieteComponent | undefined;

  selectedTicketId: string | undefined;
  tickets: Ticket[] = [];
  isLoading: boolean = false;
  displayAssignDialog: boolean = false;
  selectedAssignType: string = '';

  constructor(
    private ticketService: TicketService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.isLoading = true;
    this.spinner.show(); // Afficher le spinner
    this.ticketService.getAllTickets().subscribe(
      (tickets: any) => {
        this.tickets = tickets;
        console.log(tickets);
        this.spinner.hide(); // Masquer le spinner lorsque les données sont chargées
        this.isLoading = false;
      },
      (error) => {
        console.error('Error occurred while loading tickets:', error);
        this.spinner.hide(); // Masquer le spinner en cas d'erreur
        this.isLoading = false;
      }
    );
  }

  getPriorityColor(priorityName: string): string {
    switch (priorityName.toLowerCase()) {
      case 'haute':
        return 'red';
      case 'normale':
        return 'orange';
      case 'basse':
        return 'green';
      default:
        return 'black';
    }
  }

  onSubmit(event: Event): void {
    if (this.selectedAssignType === 'technician' && this.assignTicketTechnicianComponent) {
      this.assignTicketTechnicianComponent.saveSelectedTechnician();
    } else if (this.selectedAssignType === 'group' && this.assignTicketGroupComponent) {
      this.assignTicketGroupComponent.saveSelectedGroupe();
    } else if (this.selectedAssignType === 'societe' && this.assignTicketSocieteComponent) {
      this.assignTicketSocieteComponent.saveSelectedSociete();
    }
    event.preventDefault(); // Empêcher le rafraîchissement de la page
    this.displayAssignDialog = false; // Masquer la boîte de dialogue
    this.loadTickets(); // Recharger les tickets après la modification
  }

  onCancel(event: Event): void {
    this.displayAssignDialog = false; // Cacher la boîte de dialogue
    // Autres actions d'annulation...
  }

  showAssignDialog(ticketId: string): void {
    this.selectedTicketId = ticketId;
    this.displayAssignDialog = true;
  }
}