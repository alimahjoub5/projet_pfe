import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { FournisseurService } from 'src/app/core/services/GestionDeStocks/fournisseur.service';
import { FieldsetModule } from 'primeng/fieldset';
@Component({
  selector: 'app-addfournisseur',
  standalone: true,
  imports: [
  CommonModule,
  FieldsetModule,
  FormsModule,
  ReactiveFormsModule,
  InputTextModule,
  InputNumberModule,
  ButtonModule,
  FileUploadModule,
  RouterModule],
  templateUrl: './addfournisseur.component.html',
  styleUrl: './addfournisseur.component.scss'
})
export class AddfournisseurComponent implements OnInit {
  fournisseurform: FormGroup;

  constructor(private fb: FormBuilder, private fournisseurservice: FournisseurService) { }

  ngOnInit() {
    this.fournisseurform = this.fb.group({
      nom_fournisseur: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('nom_fournisseur', this.fournisseurform.get('nom_fournisseur').value);
    formData.append('adresse', this.fournisseurform.get('adresse').value);
    formData.append('email', this.fournisseurform.get('email').value);
    formData.append('telephone', this.fournisseurform.get('telephone').value);

    this.fournisseurservice.createFournisseur(formData).subscribe(
      (response) => {
        console.log('fournisseur créée avec succès :', response);
        this.fournisseurform.reset();
      },
      (error) => {
        console.error('Erreur lors de la création du fournisseur :', error);
      }
    );
  }

}
