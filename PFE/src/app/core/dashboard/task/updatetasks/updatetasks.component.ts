import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Correction ici : ReactiveFormsModule est importé dans AppModule
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Priority } from 'src/app/core/models/Priority';
import { PriorityService } from 'src/app/core/services/priority.service';
import { CommonModule } from '@angular/common';
import { Ticket } from 'src/app/core/models/ticket';
import { TicketService } from 'src/app/core/services/tickets.service';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { EquipmentType } from 'src/app/core/models/equipement';
import { EquipmentTypeService } from 'src/app/core/services/equipements.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { TicketStatusService } from 'src/app/core/services/ticketstatus.service';
import { TaskService } from 'src/app/core/services/task.service';
import { TicketStatus } from 'src/app/core/models/ticketstatus';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/core/models/task';
@Component({
  selector: 'app-updatetasks',
  standalone: true,
  imports: [
    AutoCompleteModule,
    FormsModule,ReactiveFormsModule,
    CommonModule,
    NgxSpinnerModule, 
  ToastModule
  ],
  templateUrl: './updatetasks.component.html',
  styleUrl: './updatetasks.component.scss'
})
export class UpdatetasksComponent {

  taskform: FormGroup;
  isLoading: boolean;
  Tickets: Ticket[];
  Status: TicketStatus[];
  priorities: Priority[];
  taskId: number;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private ticketStatusService: TicketStatusService, // Correction de la variable ticketstatuService
    private priorityService: PriorityService,
    private taskService: TaskService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskform = this.fb.group({
      TicketID: ['', Validators.required],
      StatusCodeID: ['', Validators.required],
      AssigneeID: [null, Validators.required],
      Subject: ['', Validators.required],
      Description: [null, Validators.required],
      PriorityID: ['', Validators.required],
      DueDate: ['', Validators.required],
      StartDate: [null, Validators.required],
      EndDate: [null, Validators.required],
      CompletedDate: [null, Validators.required],
    });

    this.getTaskDetails();
    this.getAllTickets();
    this.getAllStatus();
    this.getAllPriorities();
  }

  getTaskDetails(): void {
    this.taskId = +this.route.snapshot.paramMap.get('id');
    
    this.taskService.getTaskById(this.taskId).subscribe(
      (task: Task) => {
        this.taskform.patchValue(task);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de la tache :', error);
      }
    );
  }

  getAllTickets(): void {
    this.ticketService.getAllTickets().subscribe((response: any) => {
      this.Tickets = response.Tickets;
    });
  }

  getAllStatus(): void {
    this.ticketStatusService.getAllTicketStatuses().subscribe((response: any) => { // Correction de la variable ticketstatuService
      this.Status = response.Status;
    });
  }

  getAllPriorities(): void {
    this.priorityService.getAllPriorities().subscribe((response: any) => {
      this.priorities = response.priorities;
    });
  }

  onSubmit(): void {
    if (this.taskform.valid) {
      const updatedtask: Task = this.taskform.value;
      updatedtask.TicketTaskID = this.taskId;
  
      this.isLoading = true;
      this.taskService.updateTask(this.taskId, updatedtask).subscribe(
        (response: Task) => {
          console.log('tache mise à jour avec succès :', response);
          this.isLoading = false;
          this.showSuccess(); // Appel de la méthode showSuccess pour afficher le message de succès
          this.router.navigate(['/listtasks']); // Rediriger vers la page de liste des commandes
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour de la tache :', error);
          this.isLoading = false;
        }
      );
    }
  }
  
  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Commande mise à jour avec succès' });
  }
}