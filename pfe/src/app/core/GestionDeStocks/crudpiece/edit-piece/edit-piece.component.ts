import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Piece } from '../../../models/GestionDeStocks/piece';
import { PieceService } from '../../../services/GestionDeStocks/pieceService.service';
import { CommonModule } from '@angular/common';
import { FournisseurService } from 'src/app/core/services/GestionDeStocks/fournisseur.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-edit-piece',
  standalone : true,
  imports: [
    CommonModule,
    FormsModule, // Importez FormsModule ici
    ReactiveFormsModule,
    RouterModule,
    DropdownModule
  ],
  templateUrl: './edit-piece.component.html',
  styleUrls: ['./edit-piece.component.scss']
})
export class EditPieceComponent implements OnInit {
  pieceId: number;
  piece: Piece;
  pieceForm: FormGroup;
  isLoading: boolean = false;
  fournisseurs: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pieceService: PieceService,
    private formBuilder: FormBuilder,
    private fournisseurService : FournisseurService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pieceId = +params.get('id');
      this.loadPiece(this.pieceId);
    });
this.getAllFournisseurs();
    this.pieceForm = this.formBuilder.group({
      nom_piece: [{value : '',disabled: true}],
      description: ['', Validators.required],
      material: ['', Validators.required],
      serial_number: ['', Validators.required],
      cost: ['', Validators.required],
      fournisseur_id: ['', Validators.required]
      // Ajoutez d'autres champs du formulaire selon vos besoins
    });
  }
  getAllFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe((response: any) => {
      this.fournisseurs = response.fournisseurs;
    });
  }
  loadPiece(id: number): void {
    this.pieceService.getPieceById(id).subscribe(
      (piece: any) => {
        this.piece = piece;
        console.log(piece)
        // Pré-remplir le formulaire avec les données de la pièce
        this.pieceForm.patchValue({
          nom_piece: piece.nom_piece,
          description: piece.description,
          material: piece.material,
          serial_number: piece.serial_number,
          cost: piece.cost,
          fournisseur_id: piece.fournisseurs[0].nom_fournisseur
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
      var formData = this.pieceForm.value;
      console.log(formData)
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
