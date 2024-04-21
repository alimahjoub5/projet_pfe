import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { PieceService } from '../../../services/GestionDeStocks/pieceService.service';

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
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.scss'
})
export class PieceFormComponent implements OnInit {
  pieceForm: FormGroup;

  constructor(private fb: FormBuilder, private pieceService: PieceService) { }

  ngOnInit(): void {
    this.pieceForm = this.fb.group({
      nom_piece: [''],
      description: [''],
      material: [''],
      serial_number: [''],
      fabrication_date: [''],
      expiration_date: [''],
      cost: [''],
      fournisseur_id: [''],
      image_piece: [null] 
    });
  }
  

  onSubmit() {
    const formData = new FormData();
    formData.append('nom_piece', this.pieceForm.get('nom_piece').value);
    formData.append('description', this.pieceForm.get('description').value);
    formData.append('material', this.pieceForm.get('material').value);
    formData.append('serial_number', this.pieceForm.get('serial_number').value);
    formData.append('fabrication_date', this.pieceForm.get('fabrication_date').value);
    formData.append('expiration_date', this.pieceForm.get('expiration_date').value);
    formData.append('cost', this.pieceForm.get('cost').value);
    formData.append('fournisseur_id', this.pieceForm.get('fournisseur_id').value);
    const file = this.pieceForm.get('image_piece').value;
    formData.append('image_piece', file, file.name);

    this.pieceService.createPiece(formData).subscribe(
      (response) => {
        console.log('Piece créée avec succès :', response);
        this.pieceForm.reset();
      },
      (error) => {
        console.error('Erreur lors de la création de la pièce :', error);
      }
    );
  }

  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];
      this.pieceForm.patchValue({ image_piece: file }); // Mettez le fichier lui-même dans le formulaire
      this.pieceForm.get('image_piece').updateValueAndValidity();
    }
  }
  getImagePreview() {
    const file = this.pieceForm.get('image_piece').value;
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return null;
  }
}
