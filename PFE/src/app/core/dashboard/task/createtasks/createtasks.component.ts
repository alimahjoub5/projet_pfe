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
import { ActivatedRoute, RouterModule } from '@angular/router';
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
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';

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
    RouterModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    CheckboxModule
  ],
    templateUrl: './createtasks.component.html',
  styleUrl: './createtasks.component.scss'
})
export class CreatetasksComponent implements OnInit {
  ticketTaskForm: FormGroup;

  statusOptions = [
    { label: 'Nouveau', value: 'nouveau' },
    { label: 'Assigné', value: 'assigné' },
    { label: 'En cours', value: 'en_cours' },
    { label: 'Résolu', value: 'résolu' },
    { label: 'Fermé', value: 'fermé' }
  ];
  priorityOptions = [
    { label: 'Basse', value: 'basse' },
    { label: 'Normale', value: 'normale' },
    { label: 'Haute', value: 'haute' }
  ];
  
  ticketId : any;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService
    ) {
      this.ticketTaskForm = this.fb.group({
        subject: [''],
        description: [''],
        statusCodeID: [''],
        changeStatus: [false] // Assurez-vous que cette ligne est incluse pour initialiser le contrôle de case à cocher.
      });
      
  }
username:any;
  ngOnInit(): void {
    this.ticketId = Number(this.route.snapshot.paramMap.get('id'));
  this.username= this.auth.getUsername();

  }

  onSubmit(): void {
    if (this.ticketTaskForm.valid) {
      const taskData = this.ticketTaskForm.value;
      taskData.ticketId = this.ticketId;
      taskData.AssigneeID= this.auth.getUserID();
      // Envoyer les données du formulaire au backend ou autre traitement
      console.log(taskData);
    }
  }

  onCancel(): void {
    // Handle form cancellation
  }
}