import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { SocieteService } from 'src/app/core/services/societe.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-addsociete',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    FileUploadModule,
    RouterModule,ToastModule],
  templateUrl: './addsociete.component.html',
  styleUrl: './addsociete.component.scss'
})
export class AddsocieteComponent implements OnInit {
  societeForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private socservice: SocieteService,
    private router: Router,
    private messageService :MessageService,

  ) { }

  ngOnInit(): void {
    this.societeForm = this.fb.group({
      name: [''],
      address: [''],
      country: [''],
      phone: [''],
      email: [''],
      website: [''],
        });
  }
  onCancel(): void {
    // Réinitialiser le formulaire
    this.societeForm.reset();

    this.router.navigate(['/listsociete']);
}

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.societeForm.get('name').value);
    formData.append('address', this.societeForm.get('address').value);
    formData.append('country', this.societeForm.get('country').value);
    formData.append('phone', this.societeForm.get('phone').value);
    formData.append('email', this.societeForm.get('email').value);
    formData.append('website', this.societeForm.get('website').value);
  

    this.socservice.createSociete(formData).subscribe(
      (response) => {
        console.log('societe créée avec succès :', response);
        this.societeForm.reset();
        this.messageService.add({severity:'success', summary:'success', detail:'societe a éte ajouté avec succes'});
      },
      (error) => {
        console.error('Erreur lors de la création du societe :', error);
        this.messageService.add({severity:'error', summary:'Erreur', detail:error.error.message});

      }
    );
  }

  
}
