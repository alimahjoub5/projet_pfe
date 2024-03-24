import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { User } from 'src/app/core/models/User';
import { Ticket } from 'src/app/core/models/ticket';
import { PriorityService } from 'src/app/core/services/priority.service';
import { TicketService } from 'src/app/core/services/tickets.service';
import { UserService } from 'src/app/core/services/user-service.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [
    FormsModule,
    TableModule,
    DialogModule
    
  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})
export class PlanComponent {
    tickets: Ticket[];
    users : User[];
    technicians :  User[] = [];
  isLoading: boolean;
  displayAssignDialog: boolean = false;

  showAssignDialog(ticket: Ticket): void {
    this.displayAssignDialog = true;
    this.loadDropdownData();

  }

  loadDropdownData(): void {

    this.userService.getTechnicians().subscribe(technicians => {
      this.technicians = technicians;
    });
  }

  hideAssignDialog(): void {
    this.displayAssignDialog = false;
  }
    constructor(
      private ticketService: TicketService,
      private userService: UserService,
      private priorityService: PriorityService,
      private messageService: MessageService,
      private spinner: NgxSpinnerService,

    ) { }
  
    ngOnInit(): void {
      this.loadTickets();
      this.loadUsers();
    }
  
    loadTickets() {
      this.isLoading=true;
      this.spinner.show(); // Show the spinner
      setTimeout(() => {
        this.ticketService.getAllTickets().subscribe(
          (tickets: Ticket[]) => {
            this.tickets = tickets;
            this.loadPriorityNames(); // Charger les noms de priorité après avoir récupéré les tickets
          },
          (error) => {
            console.log('Error occurred while loading tickets:', error);
          }
        );
        this.spinner.hide(); // Hide the spinner when data is loaded
      }, 2000);
      this.isLoading=false;
    }
  //------------------------------------------------------------------------

  loadPriorityNames() {
    for (let ticket of this.tickets) {
      if (ticket.PriorityID !== undefined) {
        this.priorityService.getPriorityName(ticket.PriorityID).subscribe(
          (priorityName: string) => {
            ticket.PriorityName = priorityName; // Ajouter le nom de la priorité à chaque ticket
          },
          (error) => {
            console.log('Error occurred while loading priority name:', error);
          }
        );
      }
    }
  }
  //--------------------------------------------------------------
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



    //---------------------------------------------------------------------
    getPriorityColor(priorityName: string): string {
      // Définissez les couleurs pour chaque priorité
      switch (priorityName.toLowerCase()) {
        case 'haute':
          return 'red'; // Rouge pour haute priorité
        case 'moyenne':
          return 'orange'; // Orange pour moyenne priorité
        case 'basse':
          return 'green'; // Vert pour basse priorité
        default:
          return 'black'; // Couleur par défaut pour les autres priorités
      }
    }

    
  
  }
  

