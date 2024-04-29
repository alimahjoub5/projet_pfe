import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule ,Route, Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
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
  commandeId: number;

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
    this.commandeId = +this.route.snapshot.paramMap.get('id');
    
    this.commandeService.getCommandeEnAttenteById(this.commandeId).subscribe(
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
      updatedCommande.commande_id = this.commandeId;
  
      this.isLoading = true;
      this.commandeService.updateCommandeEnAttente(this.commandeId, updatedCommande).subscribe(
        (response: CommandeEnAttente) => {
          console.log('Commande mise à jour avec succès :', response);
          this.isLoading = false;
          this.showSuccess(); // Appel de la méthode showSuccess pour afficher le message de succès
          this.router.navigate(['/commande']); // Rediriger vers la page de liste des commandes
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