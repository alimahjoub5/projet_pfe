import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { StockService } from '../../services/GestionDeStocks/StockService.service';
import { Stock } from '../../models/GestionDeStocks/stocks';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stocks',
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
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss'
})
export class StockFormComponent implements OnInit {
  stockForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private stockService: StockService
  ) {}

  ngOnInit() {
    this.stockForm = this.formBuilder.group({
        nom_piece: ['', Validators.required],
        description: ['', Validators.required], // Ajoutez le champ description ici
        quantite: ['', [Validators.required, this.positiveNumberValidator()]],
        quantite_reservee: ['', [Validators.required, this.positiveNumberValidator()]],
        seuil_min: ['', [Validators.required, this.positiveNumberValidator()]],
        seuil_max: ['', [Validators.required, this.positiveNumberValidator()]],
        fournisseur_id: ['', Validators.required],
        image_piece: [null, Validators.required]
    });
}


  onSubmit() {
    if (this.stockForm.invalid) {
      return;
    }
  
    const formData = new FormData();
    const stockData: Stock = this.stockForm.value;
  
    formData.append('nom_piece', stockData.nom_piece);
    formData.append('quantite', String(stockData.quantite));
    formData.append('description', String(stockData.description));
    formData.append('quantite_reservee', String(stockData.quantite_reservee));
    formData.append('seuil_min', String(stockData.seuil_min));
    formData.append('seuil_max', String(stockData.seuil_max));
    formData.append('fournisseur_id', String(stockData.fournisseur_id));
    formData.append('image_piece', stockData.image_piece); // Ajoutez le fichier lui-même
  
    this.stockService.createStock(formData)
      .subscribe(
        response => {
          this.stockForm.reset();
        },
        error => {
          console.error('Erreur lors de la création du stock:', error);
          // Gérer l'erreur ici
        }
      );
  }
  
  

  // Fonction pour la validation personnalisée de nombre positif
  positiveNumberValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value < 0) {
        return { 'negativeNumber': { value } };
      }
      return null;
    };
  }

  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];
      this.stockForm.patchValue({ image_piece: file }); // Mettez le fichier lui-même dans le formulaire
      this.stockForm.get('image_piece').updateValueAndValidity();
    }
  }
  getImagePreview() {
    const file = this.stockForm.get('image_piece').value;
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return null;
  }
  
  
  }
  

