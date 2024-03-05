import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { User } from 'src/app/core/models/User';
import { Ticket } from 'src/app/core/models/ticket';
import { TicketService } from 'src/app/core/services/tickets.service';
import { UserService } from 'src/app/core/services/user-service.service';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [
    FormsModule,
    TableModule

  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})
export class PlanComponent {
    tickets: Ticket[];
    users: User[];
  
    constructor(
      private ticketService: TicketService,
      private userService: UserService,
      private messageService: MessageService
    ) { }
  
    ngOnInit(): void {
      this.loadTickets();
      this.loadUsers();
    }
  
    loadTickets() {
      this.ticketService.getAllTickets().subscribe(
        (tickets: Ticket[]) => {
          this.tickets = tickets;
        },
        (error) => {
          console.log('Error occurred while loading tickets:', error);
        }
      );
    }
  
    loadUsers() {
      this.userService.getUsers().subscribe(
        (users: User[]) => {
          this.users = users;
        },
        (error) => {
          console.log('Error occurred while loading users:', error);
        }
      );
    }
  
    assignTicket(ticket: Ticket) {
      if (!ticket.AssigneeID) {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner un utilisateur.' });
        return;
      }
  
      this.ticketService.assignTicketToUser(ticket.TicketID, ticket.AssigneeID).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Le ticket a été affecté avec succès.' });
        },
        (error) => {
          console.log('Error occurred while assigning ticket:', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de l\'affectation du ticket.' });
        }
      );
    }
  }
  

