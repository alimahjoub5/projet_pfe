import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Modifier RouterModule en Router
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UtilisationPiece } from '../../models/GestionDeStocks/UtilisationPiece';
import { UtilisationPieceService } from '../../services/GestionDeStocks/utilisation-piece.service';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
@Component({
  selector: 'app-utilisation',
  standalone: true,
  imports: [
    
        
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,RouterModule
    ],  templateUrl: './utilisation.component.html',
  styleUrl: './utilisation.component.scss'
})
export class UtilisationComponent implements OnInit {
  utilisations: UtilisationPiece[] =[]; // Modifier le type de données ici
  showDialog: boolean = false;
  filteredUtilisation: UtilisationPiece[];

  constructor(
    private route: ActivatedRoute, 
    private utilisationpieceService: UtilisationPieceService) { }

  ngOnInit(): void {
    this.getutilisation();
  }

  async getutilisation(): Promise<void> {
    this.utilisationpieceService.getUtilisationPieces().subscribe(response => {
      if (response && Array.isArray(response)) {
        this.utilisations = response; 
        console.log(this.utilisations);
      } else {
        console.error('La réponse de l\'API est invalide :', response);
      }
    }, error => {
      console.error('Une erreur est survenue lors de la récupération des pièces :', error);
    });
  }

  showDialogToAdd() {
    this.showDialog = true;
  }

  filter(value: string) {
    if (!value) {
      this.filteredUtilisation = this.utilisations;
    } else {
      this.filteredUtilisation = this.utilisations.filter(utilisation => {
        return
        utilisation.EquipmentTypeID.toString().toLowerCase().includes(value.toLowerCase()) || 
        utilisation.piece_id.toString().toLowerCase().includes(value.toLowerCase()) ||
        utilisation.quantity_used.toString().toLowerCase().includes(value.toLowerCase()) ||
        utilisation.date_utilisation.toString().toLowerCase().includes(value.toLowerCase()) ||
        utilisation.description.toLowerCase().includes(value.toLowerCase()) 
      });
    }
  }

  confirmDeleteutilisation(utilisation: UtilisationPiece): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette pièce ?')) {
      this.utilisationpieceService.deleteUtilisationPiece(utilisation.utilisation_id)
        .subscribe(() => {
          this.getutilisation();
        });
    }
  }
}

