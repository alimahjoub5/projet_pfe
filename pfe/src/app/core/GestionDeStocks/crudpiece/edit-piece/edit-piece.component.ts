import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Piece } from '../../../models/GestionDeStocks/piece';
import { PieceService } from '../../../services/GestionDeStocks/pieceService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-piece',
  standalone : true,
  imports: [
    CommonModule,
    FormsModule, // Importez FormsModule ici
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './edit-piece.component.html',
  styleUrls: ['./edit-piece.component.scss']
})
export class EditPieceComponent implements OnInit {
  pieceId: number;
  piece: Piece;
  pieceForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pieceService: PieceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pieceId = +params.get('id');
      this.loadPiece(this.pieceId);
    });

    this.pieceForm = this.formBuilder.group({
      nom_piece: ['', Validators.required],
      description: ['', Validators.required],
      material: ['', Validators.required],
      serial_number: ['', Validators.required],
      cost: ['', Validators.required],
      fournisseur_id: ['', Validators.required]
      // Ajoutez d'autres champs du formulaire selon vos besoins
    });
  }

  loadPiece(id: number): void {
    this.pieceService.getPieceById(id).subscribe(
      (piece: Piece) => {
        this.piece = piece;
        // Pré-remplir le formulaire avec les données de la pièce
        this.pieceForm.patchValue({
          nom_piece: this.piece.nom_piece,
          description: this.piece.description,
          material: this.piece.material,
          serial_number: this.piece.serial_number,
          cost: this.piece.cost,
          fournisseur_id: this.piece.fournisseur_id
          // Assurez-vous d'ajouter d'autres champs ici si nécessaire
        });
      },
      error => {
        console.error('Une erreur est survenue lors du chargement de la pièce:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.pieceForm.valid) {
      const formData = this.pieceForm.value;
      this.isLoading = true;
      this.pieceService.updatePiece(this.pieceId, formData).subscribe(
        () => {
          this.isLoading = false;
          // Rediriger vers la liste des pièces après la mise à jour
          this.router.navigate(['/piecelist']);
        },
        error => {
          this.isLoading = false;
          console.error('Une erreur est survenue lors de la mise à jour de la pièce:', error);
        }
      );
    }
  }
}
