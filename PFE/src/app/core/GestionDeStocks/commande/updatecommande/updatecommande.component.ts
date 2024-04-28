import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CommandeEnAttente } from 'src/app/core/models/GestionDeStocks/CommandeEnAttente';
import { Fournisseur } from 'src/app/core/models/GestionDeStocks/Fournisseur';
import { Piece } from 'src/app/core/models/GestionDeStocks/piece';
import { CommandeEnAttenteService } from 'src/app/core/services/GestionDeStocks/CommandeEnAttente.service';
import { FournisseurService } from 'src/app/core/services/GestionDeStocks/fournisseur.service';
import { PieceService } from 'src/app/core/services/GestionDeStocks/pieceService.service';

@Component({
  selector: 'app-updatecommande',
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
  templateUrl: './updatecommande.component.html',
  styleUrl: './updatecommande.component.scss'
})
export class UpdatecommandeComponent {
  commandeform: FormGroup;
  isLoading: boolean;
  fournisseurs: Fournisseur[];
  pieces: Piece[];
commande:CommandeEnAttente[];
  constructor(
    private fb: FormBuilder,
    private fournisseurService: FournisseurService,
    private pieceService: PieceService,
    private commandeService: CommandeEnAttenteService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.commandeform = this.fb.group({
      piece_id: [null, Validators.required],
      requested_quantity: [null, Validators.required],
      order_date: ['', Validators.required],
      order_status: ['', Validators.required],
      fournisseur_id: ['', Validators.required],
      expected_delivery_date: ['', Validators.required],
      actual_delivery_date: ['', Validators.required]
    });

    this.getCommandeDetails();
    this.getAllFournisseurs();
    this.getAllPieces();
  }

  getCommandeDetails(): void {
    const commandeId = +this.route.snapshot.paramMap.get('id');
    this.commandeService.getCommandeEnAttenteById(commandeId).subscribe(
      (commande: CommandeEnAttente) => {
        this.commandeform.patchValue(commande);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de la commande :', error);
      }
    );
  }

  getAllFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe((response: any) => {
      this.fournisseurs = response.fournisseurs;
    });
  }

  getAllPieces(): void {
    this.pieceService.getAllPieces().subscribe((response: any) => {
      this.pieces = response.pieces;
    });
  }

  onSubmit(): void {
    if (this.commandeform.valid) {
      const updatedCommande: CommandeEnAttente = this.commandeform.value;
      const commandeId = +this.route.snapshot.paramMap.get('id');
      updatedCommande.commande_id = commandeId;

      this.isLoading = true;
      this.commandeService.updateCommandeEnAttente(updatedCommande).subscribe(
        (response: CommandeEnAttente) => {
          console.log('Commande mise à jour avec succès :', response);
          this.isLoading = false;
          this.router.navigate(['/liste-commandes']); // Rediriger vers la page de liste des commandes
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour de la commande :', error);
          this.isLoading = false;
        }
      );
    }
  }

  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Commande mise à jour avec succès' });
  }

}
