import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { LocationService } from 'src/app/core/services/GestionDeStocks/location.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-addlocation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    FileUploadModule,
    RouterModule,ToastModule
  ],
  templateUrl: './addlocation.component.html',
  styleUrl: './addlocation.component.scss'
})
export class AddlocationComponent implements OnInit {
  localForm: FormGroup;

  constructor(private fb: FormBuilder, private locationservice: LocationService,     private messageService :MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.localForm = this.fb.group({
      name: [''],
     
    });
  }
  onCancel(): void {
    // Réinitialiser le formulaire
    this.localForm.reset();

    this.router.navigate(['/location']);
}

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.localForm.get('name').value);
   
    this.locationservice.createLocation(formData).subscribe(
      (response) => {
        console.log('local créée avec succès :', response);
        this.localForm.reset();
        this.messageService.add({severity:'success', summary:'success', detail:'local a été ajouté avec succès'});

      },
      (error) => {
        console.error('Erreur lors de la création du local :', error);
        this.messageService.add({severity:'error', summary:'Erreur', detail:error.error.message});

      }
    );
  }

  
}
