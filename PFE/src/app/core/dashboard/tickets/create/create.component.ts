import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AssigneeService } from './services/AssigneeService';
import { TicketService } from '../services/TicketService';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone:true,
  imports: [
    ReactiveFormsModule // Correction ici : imports est un tableau
  ]
})
export class CreateComponent implements OnInit {
  ticketForm: FormGroup;
  assignees: any[] = [];

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
      // Ajoutez ici d'autres champs si nécessaire
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
