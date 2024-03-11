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
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone: true,
  imports: [
    AutoCompleteModule,
    FormsModule,ReactiveFormsModule,
    CommonModule,
    NgxSpinnerModule, // Correction ici : ReactiveFormsModule est importé dans AppModule
  ToastModule
  ]
})
export class CreateComponent implements OnInit {
  equipmentTypes: EquipmentType[] | undefined;
  selectedEquipmentType: EquipmentType | null = null;
  filteredEquipmentTypes: EquipmentType[] | undefined;

  priorities: Priority[] | undefined;
  form: FormGroup;
  isLoading : boolean;
  constructor(
    private fb: FormBuilder,
    private priorityService: PriorityService,
    private ticketService: TicketService,
    private equipmentService: EquipmentTypeService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService

  ) {}

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'ticket créé avec succès' });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      subject: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required],
      equipmentTypeID: [null, Validators.required],
    });

    this.loadPriorities();
    this.loadEquipmentTypes();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading=true;
      this.spinner.show(); // Show the spinner
      // Créer une nouvelle instance de Ticket en extrayant les valeurs du formulaire
      const ticketData = this.form.value;
  
      // Créer une nouvelle instance de Ticket avec les données extraites
      const ticket: Ticket = {
        Subject: ticketData.subject,
        Description: ticketData.description,
        PriorityID: ticketData.priority,
        DueDate: ticketData.dueDate,
        EquipmentTypeID: ticketData.equipmentTypeID,
        StartDate: ticketData.startDate,
        EndDate: ticketData.endDate,
        ClosedDate: ticketData.closedDate,
        StatusCodeID : 2,
        // D'autres propriétés si nécessaire
        TicketID: null, // À remplir par le serveur
        CreatedOn: null, // Définir la date et l'heure actuelles comme createdOn
        CreatedBy: 7, // À remplir par le serveur
        ModifiedOn: undefined,
        ModifiedBy: null
      };
  
      // Appeler le service pour ajouter le ticket
      this.ticketService.addTicket(ticket).subscribe(
        (response: any) => {
          console.log('Ticket created successfully:', response);
          this.spinner.hide(); // Hide the spinner when data is loaded
          this.showSuccess();
        },
        (error: any) => {
          console.error('Error creating ticket:', error);
        }
      );
    } else {
      console.error('Invalid form. Please check required fields.');
    }
  }
  

  loadPriorities(): void {
    this.priorityService.getAllPriorities().subscribe(
      (priorities: Priority[]) => {
        this.priorities = priorities;
      },
      (error: any) => {
        console.log('Error loading priorities: ', error);
      }
    );
  }

  loadEquipmentTypes(): void {
    this.equipmentService.getAllEquipmentTypes().subscribe(
      (equipmentTypes: EquipmentType[]) => {
        this.equipmentTypes = equipmentTypes;
      },
      (error: any) => {
        console.error('Error fetching equipment types:', error);
      }
    );
  }

  filterEquipmentTypes(event: any): void {
    let filtered: EquipmentType[] = [];
    let query = event.query;

    if (this.equipmentTypes) {
      filtered = this.equipmentTypes.filter((equipmentType: EquipmentType) =>
        equipmentType.TypeName.toLowerCase().startsWith(query.toLowerCase())
      );
    }

    this.filteredEquipmentTypes = filtered;
  }

  onEquipmentTypeSelect(event: any): void {
    this.selectedEquipmentType = event.value;
    this.form.controls['equipmentTypeID'].setValue(this.selectedEquipmentType.EquipmentTypeID);
  }
}