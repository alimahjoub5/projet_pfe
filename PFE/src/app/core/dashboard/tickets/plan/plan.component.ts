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
import { Groupe } from 'src/app/core/models/groupe';
import { GroupeService } from 'src/app/core/services/groupe.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
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
    DialogModule,
    AutoCompleteModule,
    DropdownModule,
    AssignTicketGroupComponent,
    AssignTicketTechnicianComponent,
    RadioButtonModule
  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})
export class PlanComponent {

  selectedTicketId: string | undefined;


  userRole : string;
    tickets: Ticket[];
    users : User[];
    technicians :  User[] = [];
  isLoading: boolean;
  displayAssignDialog: boolean = false;
selectedAssignType: any;
  
  showAssignDialog(ticketId: string) {
    this.selectedTicketId = ticketId;
    this.displayAssignDialog = true;
  }


  hideAssignDialog(): void {
    this.displayAssignDialog = false;
  }
    constructor(
      private ticketService: TicketService,
      private userService: UserService,
      private messageService: MessageService,
      private spinner: NgxSpinnerService,
      private authservice:AuthService
    ) { }
    ngOnInit(): void {
      this.loadTickets();
      this.loadUsers();
      this.userRole=this.authservice.getRole();
      console.log(this.userRole);
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
// ----------------------------- affectation --------------------------------------------

Technicians: User[] | undefined;
  selectedTechnician: User | null = null;
  filteredTechnicians: User[] | undefined;

  Groupe: Groupe[] | undefined;
  selectedGroupe: Groupe | null = null;
  filteredGroupe: Groupe[] | undefined;



  filterTechnicians(event: any) {
    let filtered: User[] = [];
    let query = event.query;

    if (this.Technicians) {
      filtered = this.Technicians.filter((technician) =>
        technician.Username.toLowerCase().startsWith(query.toLowerCase())
      );
    }

    this.filteredTechnicians = filtered;
  }

  onTechnicianSelect(event: any) {
    this.selectedTechnician = event.value;
  }

  saveSelectedTechnician() {
    if (this.selectedTechnician) {
      // Vous pouvez enregistrer l'ID du technicien dans la base de données ici
      console.log('Selected Technician ID:', this.selectedTechnician.UserID);
    }
  }
//---------------------groupe--------------------------------
  filterGroupe(event: any) {
    let filtered: Groupe[] = [];
    let query = event.query;

    if (this.Groupe) {
      filtered = this.Groupe.filter((Groupe) =>
      Groupe.GroupName.toLowerCase().startsWith(query.toLowerCase())
      );
    }

    this.filteredGroupe = filtered;
  }

  onGroupeSelect(event: any) {
    this.selectedTechnician = event.value;
  }

  saveSelectedGroupe() {
    if (this.selectedTechnician) {
      // Vous pouvez enregistrer l'ID du technicien dans la base de données ici
      console.log('Selected Technician ID:', this.selectedTechnician.UserID);
    }
  }


  
  }
  

