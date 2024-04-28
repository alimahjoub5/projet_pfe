
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
    RouterModule
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
      order_date: ['', Validators.required],
      order_status: ['', Validators.required],
      fournisseur_id: ['', Validators.required],
      expected_delivery_date: ['', Validators.required],
      actual_delivery_date: ['', Validators.required],

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
    if (this.commandeform.valid) {
      const formData: CommandeEnAttente = {
        piece_id: this.commandeform.get('piece_id').value,
        requested_quantity: this.commandeform.get('requested_quantity').value,
        order_date: this.commandeform.get('order_date').value,
        order_status: this.commandeform.get('order_status').value,
        fournisseur_id: this.commandeform.get('fournisseur_id').value,
        expected_delivery_date: this.commandeform.get('expected_delivery_date').value,
        actual_delivery_date: this.commandeform.get('actual_delivery_date').value,
        commande_id: 0
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
        }
      );
    }
  }
  
  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Utilisation créée avec succès' });
  }
}