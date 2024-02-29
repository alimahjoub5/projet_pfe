import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketService } from '../services/TicketService';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone:true,
  imports: [
    ReactiveFormsModule,AutoCompleteModule // Correction ici : imports est un tableau
  ]
})


export class CreateComponent implements OnInit {
filterCountry($event: any) {
throw new Error('Method not implemented.');
}
  ticketForm: FormGroup;
  assignees: any[] = [];
product: any;
filteredCountries: any;
formGroup: any;


  constructor(
    private fb: FormBuilder, 
    private ticketService: TicketService,
  ) {}

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      subject: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required],
      assigneeID: [''],
     


    });
    
  }

 
  
  onSubmit() {
    if (this.ticketForm.valid) {
      const formData = this.ticketForm.value;
      // Envoie des données au service pour les traiter, par exemple :
      this.ticketService.createTicket(formData).subscribe(response => {
        // Traitez la réponse si nécessaire
        console.log('Ticket créé avec succès:', response);
        // Réinitialisez le formulaire après soumission réussie
        this.ticketForm.reset();
      }, error => {
        console.error('Erreur lors de la création du ticket:', error);
        // Traitez l'erreur selon les besoins de votre application
      });
    }
  }
}
