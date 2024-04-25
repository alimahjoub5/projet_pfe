import { UtilisationPieceService } from 'src/app/core/services/GestionDeStocks/utilisation-piece.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilisationPiece } from 'src/app/core/models/GestionDeStocks/UtilisationPiece';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updateutilisation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './updateutilisation.component.html',
  styleUrl: './updateutilisation.component.scss'
})
export class UpdateutilisationComponent implements OnInit {
  utilisationId: number;
  utilisationPieces: UtilisationPiece;
  utilisationForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utilisationPiecesService: UtilisationPieceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.utilisationId = +params.get('id');
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
        console.error('Une erreur est survenue lors du chargement de l\'utilisation de pièces:', error);
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
    if (this.utilisationForm.valid) {
      const formData = this.utilisationForm.value;
      this.isLoading = true;
      this.utilisationPiecesService.updateUtilisationPiece(this.utilisationId, formData).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/utilisation']);
        },
        error => {
          this.isLoading = false;
          console.error('Une erreur est survenue lors de la mise à jour de l\'utilisation de pièces:', error);
        }
      );
    }
  }
}
