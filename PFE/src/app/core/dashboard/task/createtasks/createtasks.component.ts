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
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CommandeEnAttente } from 'src/app/core/models/GestionDeStocks/CommandeEnAttente';
import { Fournisseur } from 'src/app/core/models/GestionDeStocks/Fournisseur';
import { Piece } from 'src/app/core/models/GestionDeStocks/piece';
import { CommandeEnAttenteService } from 'src/app/core/services/GestionDeStocks/CommandeEnAttente.service';
import { FournisseurService } from 'src/app/core/services/GestionDeStocks/fournisseur.service';
import { PieceService } from 'src/app/core/services/GestionDeStocks/pieceService.service';
import { TicketStatus } from 'src/app/core/models/ticketstatus';
import { TicketStatusService } from 'src/app/core/services/ticketstatus.service';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-createtasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    FileUploadModule,
    RouterModule
  ],
    templateUrl: './createtasks.component.html',
  styleUrl: './createtasks.component.scss'
})
export class CreatetasksComponent implements OnInit {
  taskform: FormGroup;
  isLoading: boolean;
  tickets: any;
  status: TicketStatus[];
  priorities: Priority[];

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private ticketStatusService: TicketStatusService,
    private priorityService: PriorityService,
    private taskService: TaskService,
    private spinner: NgxSpinnerService,
    private authservice : AuthService,
    private messageService: MessageService
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
      CompletedDate: [null, Validators.required]
    });

    this.getAllTickets();
    this.getAllStatus();
    this.getAllPriorities();
  }

  getAllTickets(): void {
    this.ticketService.getAllTickets().subscribe((response: any) => {
      this.tickets = response;
    });
  }

  getAllStatus(): void {
    this.ticketStatusService.getAllTicketStatuses().subscribe((response: any) => {
      this.status = response;
    });
  }

  getAllPriorities(): void {
    this.priorityService.getAllPriorities().subscribe((response: any) => {
      this.priorities = response;
    });
  }
  
  onSubmit(): void {
    if (this.taskform.valid) {
      const formData: Task = this.taskform.value;
      this.isLoading = true;
      formData.CreatedBy=Number(this.authservice.getUserID());
      this.taskService.addTask(formData).subscribe(
        (response: Task) => {
          console.log('Tâche créée avec succès :', response);
          this.isLoading = false;
          this.showSuccess();
          this.taskform.reset(); // Déplacer la réinitialisation du formulaire ici pour éviter un reset avant le message de succès
        },
        (error: any) => {
          console.error('Erreur lors de la création de la tâche :', error);
          this.isLoading = false;
        }
      );
    } else {
      // Marquer tous les champs du formulaire comme touchés pour afficher les erreurs de validation
      this.taskform.markAllAsTouched();
    }
  }
  

  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Tâche créée avec succès' });
  }
}