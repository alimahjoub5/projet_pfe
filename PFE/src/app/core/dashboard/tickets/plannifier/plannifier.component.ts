import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToolbarModule } from "primeng/toolbar";
import { TicketService } from "src/app/core/services/tickets.service";


@Component({
  selector: 'app-plannifier',
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
  templateUrl: './plannifier.component.html',
  styleUrl: './plannifier.component.scss'
})
export class PlannifierComponent {
  tickets: any[] = [];
  isLoading: boolean = true;
  displayScheduleDialog: boolean = false;
  selectedTicket: any = {};
  technicians: any[] = []; // Charger les techniciens disponibles
  showTime: boolean = false; // Ajout de showTime
  confirmMode: boolean;

  constructor(private ticketService: TicketService , private messageService : MessageService) { }

  ngOnInit() {
    this.loadTickets();
    this.loadTechnicians(); // Charger la liste des techniciens
  }

  loadTickets() {
    this.ticketService.getAllTickets().subscribe(data => {
      console.log(data)
      // Filtrer les tickets dont le champ datepriseencharge est null, le StatusCodeID est différent de "Annuler" et le TicketType est "préventive"
      this.tickets = data.filter(ticket => ticket.datepriseencharge === null && ticket.StatusCodeID !== "Annuler" && ticket.TicketType !== "curative");
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
    this.selectedTicket.scheduledDate = new Date();
    this.selectedTicket.isScheduled = true; // Assurez-vous de définir isScheduled sur true lors de l'ouverture du popup de planification
    this.displayScheduleDialog = true;
    this.confirmMode = false; // Ajouter cela si nécessaire
  }
  

  scheduleTicket() {
    if (this.selectedTicket.isScheduled) {
      // Appel du service pour mettre à jour la date de prise en charge
      this.ticketService.updateDatePriseEnCharge(this.selectedTicket.TicketID, this.selectedTicket.scheduledDate.toISOString())
        .subscribe(
          () => {
            // Si la mise à jour réussit
            this.selectedTicket.isScheduled = true;
            // Autres opérations de planification, le cas échéant
            this.displayScheduleDialog = false;
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Ticket planifié avec succès.' });
            this.loadTickets();
          },
          error => {
            // En cas d'échec de la mise à jour
            console.error('Erreur lors de la planification du ticket :', error);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la planification du ticket. Veuillez réessayer plus tard.' });
          }
        );
    } else {
      console.error('Échec de la planification. Le ticket n\'est pas marqué comme planifié.');
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la planification. Le ticket n\'est pas marqué comme planifié.' });
    }
  }
  

  confirmDelete(ticket) {
    // Implémentation de la confirmation de suppression
  }

  getPriorityColor(priorityID) {
    // Implémentation de la logique pour retourner la classe CSS en fonction de la priorité
  }
}