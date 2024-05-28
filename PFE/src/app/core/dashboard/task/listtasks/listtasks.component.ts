import { Component , OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {RouterModule , ROUTES} from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Task } from 'src/app/core/models/task';
import { TaskService } from 'src/app/core/services/task.service';
import { PriorityService } from 'src/app/core/services/priority.service';
import { TicketService } from 'src/app/core/services/tickets.service';
import { TicketStatusModule } from '../../ticket-status/ticket-status.module';
import { TicketStatusService } from 'src/app/core/services/ticketstatus.service';
import { UserService } from 'src/app/core/services/user-service.service';

@Component({
  selector: 'app-listtasks',
  standalone:true,
  imports: [FormsModule,
    ButtonModule,
     ReactiveFormsModule, 
    AutoCompleteModule,
    TableModule,DialogModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    SplitButtonModule,
    RouterModule,
    NgxSpinnerModule,
CommonModule],
  templateUrl: './listtasks.component.html',
  styleUrls: ['./listtasks.component.scss'],
  providers: [MessageService, ConfirmationService ],
})
export class ListtasksComponent implements OnInit {
  tasks: any;
  cols: any;
  isLoading: boolean;

  constructor(
    private taskService: TaskService,
    private priorityService: PriorityService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private ticketService: TicketService,
              private userservice: UserService,
              private ticketstatusservice: TicketStatusService
  ) {}

  ngOnInit() {
    // Initialiser le tableau de tâches avec des valeurs statiques
    this.tasks = [
      {
        id: 1,
        Subject: "Réparation des ordinateurs",
        Description: 'Remplacer le disque dur défectueux par un nouveau disque SSD',
        StartDate: "08/02/2024, 8:00",
        EndDate: "09/02/2024, 15:00"
      },
      {
        id: 2,
        Subject: 'Installation de logiciel de sécurité',
        Description: 'Installer et configurer un logiciel antivirus sur le serveur principal',
        StartDate: "09/02/2024, 13:00",
        EndDate: "05/02/2024, 16:00"
      },
      {
        id: 3,
        Subject: 'Maintenance réseau',
        Description: 'Vérifier et résoudre les problèmes de connectivité réseau dans le bureau',
        StartDate: "10/02/2024, 8:00",
        EndDate: "12/02/2024, 12:00"
      }
      // Vous pouvez ajouter autant d'éléments que nécessaire
    ];
  
    //this.spinner.show(); // Show the spinner
    //this.loadTasks();
  }

//---------------------------------------------------------------------------------------

  loadTasks() {
   this.isLoading=true;
   this.spinner.show(); // Show the spinner
   setTimeout(() => {
     this.taskService.getAllTasks().subscribe(
       (tasks: Task) => {
         this.tasks = tasks;
        this.loadPriorityNames();
        this.loadStatus();
        this.loaduser();
        this.loadTicketName()
       },
        (error) => {
         console.log('Error occurred while loading tasks:', error);
       }//
      );
     this.spinner.hide(); // Hide the spinner when data is loaded
   }, 2000);
  this.isLoading=false;
 }

 loaduser() {
  if (Array.isArray(this.tasks)) {
    this.tasks.forEach(task => {
      if (task.AssigneeID !== undefined) {
        this.userservice.getUsername(task.AssigneeID).subscribe(
          (statusName: string) => {
            task.AssigneeName = statusName; // Ajouter le nom du statut à chaque tâche
          },
          (error) => {
            console.log('Error occurred while loading status name:', error);
          }
        );
      }
    });
  } else {
    console.log('Tasks is not an array. Unable to load status names.');
  }
}

 loadStatus() {
  if (Array.isArray(this.tasks)) {
    this.tasks.forEach(task => {
      if (task.StatusCodeID !== undefined) {
        this.ticketstatusservice.getStatusName(task.StatusCodeID).subscribe(
          (statusName: string) => {
            task.StatusName = statusName; // Ajouter le nom du statut à chaque tâche
          },
          (error) => {
            console.log('Error occurred while loading status name:', error);
          }
        );
      }
    });
  } else {
    console.log('Tasks is not an array. Unable to load status names.');
  }
}


loadTicketName() {
  if (Array.isArray(this.tasks)) {
    this.tasks.forEach(task => {
      if (task.StatusCodeID !== undefined) {
        this.ticketService.getTicketName(task.TicketID).subscribe(
          (statusName: string) => {
            task.ticketname = statusName; // Ajouter le nom du statut à chaque tâche
          },
          (error) => {
            console.log('Error occurred while loading status name:', error);
          }
        );
      }
    });
  } else {
    console.log('Tasks is not an array. Unable to load status names.');
  }
}




 loadPriorityNames() {
  if (Array.isArray(this.tasks)) {
    this.tasks.forEach(task => {
      if (task.PriorityID !== undefined) {
        this.priorityService.getPriorityName(task.PriorityID).subscribe(
          (priorityName: string) => {
            task.PriorityName = priorityName; // Ajouter le nom de la priorité à chaque ticket
          },
          (error) => {
            console.log('Error occurred while loading priority name:', error);
          }
        );
      }
    });
  } else {
    console.log('Tasks is not an array. Unable to load priority names.');
  }
}

  



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
  confirmDelete(task: Task): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce ticket ?');
    if (confirmation) {
      this.taskService.deleteTask(task.TicketTaskID).subscribe(
        () => {
          this.spinner.show(); // Show the spinner
         // this.loadTasks();
          this.showSuccess();


        },
        (error) => {
          // En cas d'erreur lors de la suppression
          this.showError();
          console.error('Erreur lors de la suppression du tache : ', error);
        }
      );
    }
  }

  deleteTask(TicketTaskID: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      this.taskService.deleteTask(TicketTaskID).subscribe(() => {
      //  this.loadTasks(); // Recharger la liste des tâches après la suppression
      });
    }
  }
}
