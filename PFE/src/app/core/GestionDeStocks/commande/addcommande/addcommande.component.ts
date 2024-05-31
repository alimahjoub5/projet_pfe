import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { PieceService } from 'src/app/core/services/GestionDeStocks/pieceService.service';
import { CommandeEnAttenteService } from 'src/app/core/services/GestionDeStocks/CommandeEnAttente.service';
import { Fournisseur } from 'src/app/core/models/GestionDeStocks/Fournisseur';
import { Piece } from 'src/app/core/models/GestionDeStocks/piece';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { FournisseurService } from 'src/app/core/services/GestionDeStocks/fournisseur.service';
import { CommandeEnAttente } from 'src/app/core/models/GestionDeStocks/CommandeEnAttente';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-addcommande',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    FileUploadModule,
    RouterModule,
    DropdownModule,
    MultiSelectModule
  ],
  templateUrl: './addcommande.component.html',
  styleUrls: ['./addcommande.component.scss']
})
export class AddcommandeComponent implements OnInit {
  commandeform: FormGroup;
  isLoading: boolean = false;
  fournisseurs: Fournisseur[];
  pieces: Piece[];

  constructor(
    private fb: FormBuilder,
    private fournisseurService: FournisseurService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private authservice: AuthService,
    private pieceservice: PieceService,
    private commandeservice: CommandeEnAttenteService
  ) {}

  ngOnInit(): void {
    this.commandeform = this.fb.group({
      commandes: this.fb.array([this.createCommandeGroup()])
    });

    this.getAllFournisseurs();
    this.getAllPieces();
  }

  get commandes(): FormArray {
    return this.commandeform.get('commandes') as FormArray;
  }

  createCommandeGroup(): FormGroup {
    return this.fb.group({
      piece_id: [null, Validators.required],
      requested_quantity: [null, Validators.required],
      fournisseur_id: [null, Validators.required],
      expected_delivery_date: [null, Validators.required]
    });
  }

  addCommande(): void {
    this.commandes.push(this.createCommandeGroup());
  }

  removeCommande(index: number): void {
    this.commandes.removeAt(index);
  }

  getAllFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe((response: any) => {
      this.fournisseurs = response.fournisseurs;
    });
  }

  getAllPieces(): void {
    this.pieceservice.getAllPieces().subscribe((response: any) => {
      this.pieces = response.pieces;
    });
  }

  onSubmit(): void {
    try {
      if (this.commandeform.valid) {
        const formData = this.commandeform.value.commandes.map((commande: any) => {
          // Ensure pieceId and fournisseurId are not null
          const pieceId = commande.piece_id ? commande.piece_id : null;
          const fournisseurId = commande.fournisseur_id ? commande.fournisseur_id : null;
  
          // Log values for debugging
          console.log('Piece ID:', pieceId);
          console.log('Fournisseur ID:', fournisseurId);
  
          // Return structured object, handling possible null values
          return {
            piece_id: pieceId ? pieceId.piece_id : null,
            fournisseur_id: fournisseurId ? fournisseurId.fournisseur_id : null,
            order_date: new Date(),
            requested_quantity: commande.requested_quantity, // Utilisation de la quantité demandée de la commande actuelle
            order_status: 'pending',
            commande_id: 0,
            actual_delivery_date: null
          };
        });
  
        // Log formData for debugging
        console.log('Form Data:', formData);
  
        this.isLoading = true;
        this.commandeservice.enregistrerCommande(formData).subscribe(
          (response: CommandeEnAttente[]) => {
            console.log('Commandes en attente créées avec succès :', response);
            this.commandeform.reset();
            this.commandes.clear();
            this.addCommande();
            this.isLoading = false;
            this.showSuccess();
          },
          (error: any) => {
            console.error('Erreur lors de la création des commandes en attente :', error);
            this.isLoading = false;
          }
        );
      } else {
        this.validateAllFormFields(this.commandeform);
        console.error('Le formulaire est invalide.');
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de la création des commandes en attente :', error);
    }
  }
  
  
  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormArray) {
        control.controls.forEach((group: FormGroup) => this.validateAllFormFields(group));
      } else {
        control.markAsDirty({ onlySelf: true });
      }
    });
  }
  
  

  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Commandes créées avec succès' });
  }
}
