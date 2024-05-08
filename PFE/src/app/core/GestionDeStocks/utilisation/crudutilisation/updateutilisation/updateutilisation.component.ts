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
  utilisationForm: FormGroup;
  isLoading: boolean;
  equipements: EquipmentType[];
  pieces: Piece[];
  utilisationId: number;

  constructor(
    private fb: FormBuilder,
    private equipementService: EquipmentTypeService ,
    private pieceService: PieceService,
    private utilisationService: UtilisationPieceService ,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.utilisationForm = this.fb.group({
      EquipmentTypeID: ['', Validators.required],
      piece_id: ['', Validators.required],
      quantity_used: ['', Validators.required],
      date_utilisation: [{disabled: true}], // Disabled initially
      description: [null, Validators.required],
    
    });

    this.getUtilisationDetails();
    this.getAllEquipements();
    this.getAllPieces();
  }

  getUtilisationDetails(): void {
    this.utilisationId = +this.route.snapshot.paramMap.get('id');
    
    this.utilisationService.getUtilisationPieceById(this.utilisationId).subscribe(
      (utilisation: UtilisationPiece) => {
        this.utilisationForm.patchValue(utilisation);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de la commande :', error);
      }
    );
  }

 
  getAllEquipements(): void {
    this.equipementService.getAllEquipmentTypes().subscribe((equipements: EquipmentType[]) => {
      this.equipements = equipements;
    });
  }

  getAllPieces(): void {
    this.pieceService.getAllPieces().subscribe((response: any) => {
      this.pieces = response.pieces;
    });
  }

  onSubmit(): void {
    
    if (this.utilisationForm.valid) {
      const updatedUtilisation: UtilisationPiece = this.utilisationForm.value;
      updatedUtilisation.utilisation_id = this.utilisationId;
  
      this.isLoading = true;
      this.utilisationService.updateUtilisationPiece(this.utilisationId, updatedUtilisation).subscribe(
        (response: UtilisationPiece) => {
          console.log('UtilisationPiece mise à jour avec succès :', response);
          this.isLoading = false;
          this.showSuccess(); // Appel de la méthode showSuccess pour afficher le message de succès
          this.router.navigate(['/utilisation']); // Rediriger vers la page de liste des commandes
        },
        error => {
          // Afficher le message d'erreur retourné par l'API
          this.messageService.add({severity:'error', summary:'Erreur', detail:error.error.message});
          this.isLoading = false;

        }
      );
    }
  }
  
  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Commande mise à jour avec succès' });
  }
}