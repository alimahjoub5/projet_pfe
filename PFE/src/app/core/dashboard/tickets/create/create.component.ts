import { Component, OnInit, ViewChild } from '@angular/core';
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
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { AssignTicketGroupComponent } from './assign-ticket-group/assign-ticket-group.component';
import { AssignTicketSocieteComponent } from './assign-ticket-societe/assign-ticket-societe.component';
import { AssignTicketTechnicianComponent } from './assign-ticket-technician/assign-ticket-technician.component';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
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
  ToastModule,
  SelectButtonModule,
  DropdownModule,
  DialogModule,
  AssignTicketGroupComponent,
  AssignTicketSocieteComponent,
  AssignTicketTechnicianComponent ,
  RadioButtonModule,
  DialogModule,
  AutoCompleteModule,
]
})
export class CreateComponent implements OnInit {
  equipmentTypes: EquipmentType[] | undefined;
  selectedEquipmentType: EquipmentType | null = null;
  filteredEquipmentTypes: EquipmentType[] | undefined;

  form: FormGroup;
  isLoading : boolean;
  value: any;
  choix: any[] = [
    { name: 'Curative', value: 'curative' },
    { name: 'Préventive', value: 'préventive' },
    // Ajoutez d'autres options de paiement au besoin
  ];
Priorit: any[] = [
  { name: 'Haute', value: 'haute' },
  { name: 'Normale', value: 'normale' },
  { name: 'Basse', value: 'basse' },
  
  // Ajoutez d'autres options de paiement au besoin
];



@ViewChild(AssignTicketGroupComponent) assignTicketGroupComponent: AssignTicketGroupComponent | undefined;
@ViewChild(AssignTicketTechnicianComponent) assignTicketTechnicianComponent: AssignTicketTechnicianComponent | undefined;
@ViewChild(AssignTicketSocieteComponent) assignTicketSocieteComponent: AssignTicketSocieteComponent | undefined;

displayAssignDialog: boolean = false;
selectedAssignType: string = '';
selectedOption: any;
  valueFromA: any;
id: any;


  constructor(
    private fb: FormBuilder,
    private priorityService: PriorityService,
    private ticketService: TicketService,
    private equipmentService: EquipmentTypeService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private authservice: AuthService,

  ) {}

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'ticket créé avec succès' });
  }

  ngOnInit(): void {
    this.ticketService.getLastID().subscribe(
      (response: any) => {
       this.id=Number(response)+1;
      });
    this.form = this.fb.group({
      subject: ['', Validators.required],
      description: ['',Validators.required],
      assignType: ['',Validators.required],
      priority: ['', Validators.required],
      TicketType : ['', Validators.required],
      selectedEquipmentType: [null, Validators.required],

    });

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
        EquipmentTypeID: this.value,
        StartDate: ticketData.startDate,
        EndDate: ticketData.endDate,
        ClosedDate: ticketData.closedDate,
        TicketType : ticketData.TicketType,
        StatusCodeID : 1,
        // D'autres propriétés si nécessaire
        TicketID: null, // À remplir par le serveur
        CreatedOn: null, // Définir la date et l'heure actuelles comme createdOn
        CreatedBy: Number(this.authservice.getUserID()), // À remplir par le serveur
        ModifiedOn: undefined,
        ModifiedBy: null
      };
      console.log(ticket);      // Appeler le service pour ajouter le ticket
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
    console.log(event.value);
    this.form.controls['equipmentTypeID'].setValue(event.value.TypeName);
    this.value= event.value.EquipmentTypeID;
    console.log(this.value);

  }


  onSubmit1(): void {
    if (this.selectedAssignType === 'technician' && this.assignTicketTechnicianComponent) {
      this.assignTicketTechnicianComponent.saveSelectedTechnician();
    } else if (this.selectedAssignType === 'group' && this.assignTicketGroupComponent) {
      this.assignTicketGroupComponent.saveSelectedGroupe();
    } else if (this.selectedAssignType === 'societe' && this.assignTicketSocieteComponent) {
      this.assignTicketSocieteComponent.saveSelectedSociete();
    }
    event.preventDefault(); // Empêcher le rafraîchissement de la page
    this.displayAssignDialog = false; // Masquer la boîte de dialogue
  }
  

  onCancel(): void {
    this.displayAssignDialog = false; // Cacher la boîte de dialogue
    // Autres actions d'annulation...
  }
  showAssignDialog(): void {
    this.displayAssignDialog = true;
  }
}