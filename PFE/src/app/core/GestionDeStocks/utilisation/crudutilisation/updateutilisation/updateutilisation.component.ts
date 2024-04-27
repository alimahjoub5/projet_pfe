import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Correction ici : ReactiveFormsModule est importé dans AppModule
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { UtilisationPieceService } from 'src/app/core/services/GestionDeStocks/utilisation-piece.service';
import { EquipmentType } from 'src/app/core/models/equipement';
import { Piece } from 'src/app/core/models/GestionDeStocks/piece';
import { MessageService } from 'primeng/api';

import { AuthService } from 'src/app/core/services/auth.service';
import { EquipmentTypeService } from 'src/app/core/services/equipements.service';
import { PieceService } from 'src/app/core/services/GestionDeStocks/pieceService.service';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisationPiece } from 'src/app/core/models/GestionDeStocks/UtilisationPiece';

@Component({
  selector: 'app-updateutilisation',
  standalone: true,
  imports: [ AutoCompleteModule,
    FormsModule,ReactiveFormsModule,
    CommonModule,
    NgxSpinnerModule,
    ButtonModule, 
  ToastModule],
  templateUrl: './updateutilisation.component.html',
  styleUrl: './updateutilisation.component.scss'
})
export class UpdateutilisationComponent implements OnInit {
  utilisationId: number;
  utilisationPieces: UtilisationPiece;
  utilisationForm: FormGroup;
  isLoading: boolean = false;
  equipements: EquipmentType[];
  pieces: Piece[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utilisationPiecesService: UtilisationPieceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.utilisationId = +Number(params.get('id'));
      this.loadUtilisationPieces(this.utilisationId);
    });

    this.utilisationForm = this.formBuilder.group({
      EquipmentTypeID: ['', Validators.required],
      piece_id: ['', Validators.required],
      quantity_used: ['', Validators.required],
      date_utilisation: ['', Validators.required],
      description: ['']
    });
  }

  loadUtilisationPieces(id: number): void {
    this.utilisationPiecesService.getUtilisationPieceById(id).subscribe(
      (utilisationPieces: UtilisationPiece) => {
        this.utilisationPieces = utilisationPieces;
        this.patchFormValues();
      },
      error => {
        console.error('Une erreur est survenue lors du chargement de la pièce:', error);
      }
    );
  }

  patchFormValues(): void {
    this.utilisationForm.patchValue({
      EquipmentTypeID: this.utilisationPieces.EquipmentTypeID,
      piece_id: this.utilisationPieces.piece_id,
      quantity_used: this.utilisationPieces.quantity_used,
      date_utilisation: this.utilisationPieces.date_utilisation,
      description: this.utilisationPieces.description
    });
  }

  onSubmit(): void {
    if (this.utilisationForm.valid && this.utilisationId !== null && this.utilisationId !== undefined) {
      const formData = this.utilisationForm.value;
      this.isLoading = true;
      this.utilisationPiecesService.updateUtilisationPiece(this.utilisationId, formData).subscribe(
        () => {
          console.log(this.utilisationPieces);
          this.isLoading = false;
          this.router.navigate(['/utilisation']); // Rediriger vers la liste des pièces après la mise à jour
        },
        error => {
          this.isLoading = false;
          console.error('Une erreur est survenue lors de la mise à jour de la pièce:', error);
        }
      );
    } else {
      console.error('Veuillez fournir une valeur valide pour utilisationId et remplir le formulaire correctement.');
    }
  }
  
}