import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Piece } from '../../../models/GestionDeStocks/piece';
import { PieceService } from '../../../services/GestionDeStocks/pieceService.service';
import { CommonModule } from '@angular/common';
import { FournisseurService } from 'src/app/core/services/GestionDeStocks/fournisseur.service';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-edit-piece',
  standalone : true,
  imports: [
    CommonModule,
    FormsModule, // Importez FormsModule ici
    ReactiveFormsModule,
    RouterModule,
    DropdownModule,ToastModule
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
    private messageService :MessageService,
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

  onCancel(): void {
    // Réinitialiser le formulaire

    this.router.navigate(['/piecelist']);
}
  getAllFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe((response: any) => {
      this.fournisseurs = response.fournisseurs;
    });
  }

  
  loadPiece(pieceId: number): void {
    this.pieceId = +this.route.snapshot.paramMap.get('id');
    this.pieceService.getPieceById(this.pieceId).subscribe(
      (piece: any) => {
        this.pieceForm.patchValue(piece);
        console.log(piece)
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du piece :', error);
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
          this.messageService.add({severity:'success', summary:'success', detail:'pièce a éte modifié avec succes'});
        },
        error => {
          this.isLoading = false;
          console.error('Une erreur est survenue lors de la mise à jour de la pièce:', error);
          this.messageService.add({severity:'error', summary:'Erreur', detail:error.error.message});

        }
      );
    }
  }
}
