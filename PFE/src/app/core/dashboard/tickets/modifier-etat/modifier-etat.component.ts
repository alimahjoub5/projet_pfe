import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToolbarModule } from "primeng/toolbar";
import { TicketService } from "src/app/core/services/tickets.service";


@Component({
  selector: 'app-modifier-etat',
  standalone: true,
  imports: [
    TableModule,
    ToolbarModule,
    RouterModule,
    CommonModule,
    NgxSpinnerModule,
    ToastModule,
    DialogModule,
    CalendarModule,
    FormsModule,
    DropdownModule,
    ToggleButtonModule
  ],
  templateUrl: './modifier-etat.component.html',
  styleUrl: './modifier-etat.component.scss'
})
export class ModifieretatComponent implements OnInit {
  tickets: any[] = [];
  isLoading: boolean = true;
  displayScheduleDialog: boolean = false;
  selectedTicket: any = {};
  technicians: any[] = []; // Charger les techniciens disponibles
  showTime: boolean = false; // Ajout de showTime
  
  constructor(private ticketService: TicketService) { }


  
  ngOnInit() {
    this.loadTickets();
    this.loadTechnicians(); // Charger la liste des techniciens
  }

  loadTickets() {
    this.ticketService.getAllTickets().subscribe(data => {
      this.tickets = data;
      this.isLoading = false;
    });
  }

  loadTechnicians() {
    // Implémentez la méthode pour charger les techniciens depuis votre service
    this.technicians = [
      { name: 'Technicien 1', id: 1 },
      { name: 'Technicien 2', id: 2 },
      // Ajouter les techniciens
    ];
  }

  openSchedulePopup(ticket) {
    this.selectedTicket = ticket;
    this.selectedTicket.scheduledDate = new Date(); // Initialiser avec la date actuelle ou une valeur spécifique
    this.displayScheduleDialog = true;
  }

  scheduleTicket() {
    this.selectedTicket.isScheduled = true;
    // Logique de planification à ajouter ici
    this.displayScheduleDialog = false;
  }

  confirmDelete(ticket) {
    // Implémentation de la confirmation de suppression
  }

  getPriorityColor(priorityID) {
    // Implémentation de la logique pour retourner la classe CSS en fonction de la priorité
  }
  updateTicketState(ticket: any) {
    // Logique pour mettre à jour l'état du ticket avec les nouvelles valeurs du formulaire
    console.log('Nouvel état du ticket :', ticket.newState);

    // Code pour appeler le service/API pour mettre à jour l'état du ticket
    // this.ticketService.updateTicketState(ticket.TicketID, ticket.newState).subscribe((response) => {
    //     console.log('Ticket mis à jour avec succès :', response);
    // });
    
    this.displayScheduleDialog = false; // Fermez le popup après la soumission
  }
}