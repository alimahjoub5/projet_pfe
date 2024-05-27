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
  styleUrl: './addcommande.component.scss'
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
      console.log(this.pieces);
    });
  }

  onSubmit(): void {
    try {
      if (this.commandeform.valid) {
        const formData = this.commandeform.value.commandes.map((commande: any) => {
          // Extrait l'identifiant de la pièce (supposant qu'il y a toujours au moins un élément dans le tableau)
          const pieceId = commande.piece_id.length > 0 ? commande.piece_id[0].piece_id : null;
  
          // Extrait l'identifiant du fournisseur
          const fournisseurId = commande.fournisseur_id ? commande.fournisseur_id.fournisseur_id : null;
  
          return {
            ...commande,
            piece_id: pieceId,
            fournisseur_id: fournisseurId,
            order_date: new Date(),
            order_status: 'pending',
            commande_id: 0,
            actual_delivery_date: null
          };
        });
  
        this.isLoading = true;
        this.commandeservice.createCommandeEnAttente(formData).subscribe(
          (response: CommandeEnAttente[]) => {
            console.log('Commandes en attente créées avec succès :', response);
            this.commandeform.reset();
            this.commandes.clear();
            this.addCommande();
            this.isLoading = false;
            this.showSuccess(); // Appeler la méthode de message de succès
          },
          (error: any) => {
            console.error('Erreur lors de la création des commandes en attente :', error);
            this.isLoading = false;
            throw error; // Lancer l'erreur pour la capturer dans le bloc catch
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
  
  

  validateAllFormFields(formGroup: FormGroup) {
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
