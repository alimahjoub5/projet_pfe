import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { SocieteService } from 'src/app/core/services/societe.service';
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
    RouterModule],
  templateUrl: './addsociete.component.html',
  styleUrl: './addsociete.component.scss'
})
export class AddsocieteComponent implements OnInit {
  societeForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private socservice: SocieteService) { }

  ngOnInit(): void {
    this.societeForm = this.fb.group({
      name: [''],
      address: [''],
      city: [''],
      country: [''],
      phone: [''],
      email: [''],
      website: [''],
      contact_person: [''],
      contact_phone: [''],
      contact_email: [''],

    });
  }
  

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.societeForm.get('name').value);
    formData.append('address', this.societeForm.get('address').value);
    formData.append('city', this.societeForm.get('city').value);
    formData.append('country', this.societeForm.get('country').value);
    formData.append('phone', this.societeForm.get('phone').value);
    formData.append('email', this.societeForm.get('email').value);
    formData.append('website', this.societeForm.get('website').value);
    formData.append('contact_person', this.societeForm.get('contact_person').value);
    formData.append('contact_phone', this.societeForm.get('contact_phone').value);
    formData.append('contact_email', this.societeForm.get('contact_email').value);

    this.socservice.createSociete(formData).subscribe(
      (response) => {
        console.log('societe créée avec succès :', response);
        this.societeForm.reset();
      },
      (error) => {
        console.error('Erreur lors de la création du societe :', error);
      }
    );
  }

  
}
