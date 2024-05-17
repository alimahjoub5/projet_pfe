
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  isLoading: boolean;
  fournisseurs: Fournisseur[] ;
  pieces: Piece;

  constructor(
    private fb: FormBuilder,
    private fournisseurService: FournisseurService ,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private authservice: AuthService,
    private pieceservice: PieceService,
    private commandeservice: CommandeEnAttenteService 
  ) {}
  ngOnInit(): void {
    this.commandeform = this.fb.group({
      piece_id: [null, Validators.required],
      requested_quantity: [null, Validators.required],
      fournisseur_id: ['', Validators.required],
      expected_delivery_date: ['', Validators.required],

    });
    
    this.getAllFournisseurs();
    this.getAllPieces();
  }

  getAllFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe((response: any) => {
      this.fournisseurs = response.fournisseurs ;
    });
  }

  getAllPieces(): void {
    this.pieceservice.getAllPieces().subscribe((response: any ) => {
      this.pieces = response.pieces;
      console.log(this.pieces);
    });
  }
  onSubmit(): void {
    try {
      if (this.commandeform.valid) {
        const formData: CommandeEnAttente = {
          piece_id: this.commandeform.get('piece_id').value,
          requested_quantity: this.commandeform.get('requested_quantity').value,
          order_date: null,
          fournisseur_id: this.commandeform.get('fournisseur_id').value,
          expected_delivery_date: this.commandeform.get('expected_delivery_date').value,
          actual_delivery_date: null,
          commande_id: 0,
          order_status: null
        };
  
        this.isLoading = true;
        this.commandeservice.createCommandeEnAttente(formData).subscribe(
          (response: CommandeEnAttente) => {
            console.log('Commande en attente créée avec succès :', response);
            this.commandeform.reset();
            this.isLoading = false;
            this.showSuccess(); // Appeler la méthode de message de succès
          },
          (error: any) => {
            console.error('Erreur lors de la création de la commande en attente :', error);
            this.isLoading = false;
            throw error; // Lancer l'erreur pour la capturer dans le bloc catch
          }
        );
      } else {
        console.log(this.commandeform.value);
        console.error('Le formulaire est invalide.');
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de la création de la commande en attente :', error);
    }
  }
  
  
  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Utilisation créée avec succès' });
  }
}