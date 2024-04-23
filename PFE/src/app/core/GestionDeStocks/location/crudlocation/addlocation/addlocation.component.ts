import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { LocationService } from 'src/app/core/services/GestionDeStocks/location.service';
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
    RouterModule
  ],
  templateUrl: './addlocation.component.html',
  styleUrl: './addlocation.component.scss'
})
export class AddlocationComponent implements OnInit {
  localForm: FormGroup;

  constructor(private fb: FormBuilder, private locationservice: LocationService) { }

  ngOnInit(): void {
    this.localForm = this.fb.group({
      name: [''],
     
    });
  }
  

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.localForm.get('name').value);
   
    this.locationservice.createLocation(formData).subscribe(
      (response) => {
        console.log('local créée avec succès :', response);
        this.localForm.reset();
      },
      (error) => {
        console.error('Erreur lors de la création du local :', error);
      }
    );
  }

  
}
