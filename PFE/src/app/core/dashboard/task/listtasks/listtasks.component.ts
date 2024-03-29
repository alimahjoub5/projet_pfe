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
  tasks: Task[] = [];
  cols: any;
  isLoading: boolean;

  constructor(
    private taskService: TaskService,
    private priorityService: PriorityService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private ticketservice: TicketService,
              private ticketstatusservice: TicketStatusService
  ) {}

  ngOnInit(): void {

    this.spinner.show(); // Show the spinner
    //this.loadTasks();
  }

//---------------------------------------------------------------------------------------

  //loadTasks() {
   // this.isLoading=true;
   // this.spinner.show(); // Show the spinner
   //setTimeout(() => {
    //  this.taskService.getAllTasks().subscribe(
     //   (tasks: Task[]) => {
     //     this.tasks = tasks;
     //    this.loadTicketNames();
      //    this.loadPriorityNames();
       //   this.loadTicketStatusNames(); 
       // },
        //(error) => {
        //  console.log('Error occurred while loading tasks:', error);
       // }//
      //);
    //  this.spinner.hide(); // Hide the spinner when data is loaded
   // }, 2000);
//   this.isLoading=false;
 // }


  //---------------------------------------------------------------------------------

  loadPriorityNames() {
    for (let task of this.tasks) {
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
    }
  }


  loadTicketStatusNames(){
    for (let task of this.tasks) {
      if (task.StatusCodeID !== undefined) {
        this.ticketstatusservice.getStatusName(task.StatusCodeID).subscribe(
          (StatusName: string) => {
            task.StatusName = StatusName; 
          },
          (error) => {
            console.log('Error occurred while loading priority name:', error);
          }
        );
      }
    }
  }

  loadTicketNames(){
    for (let task of this.tasks) {
      if (task.TicketID !== undefined) {
        this.ticketservice.getTicketName(task.TicketID).subscribe(
          (Subject: string) => {
            task.Subject = Subject; 
          },
          (error) => {
            console.log('Error occurred while loading priority name:', error);
          }
        );
      }
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
