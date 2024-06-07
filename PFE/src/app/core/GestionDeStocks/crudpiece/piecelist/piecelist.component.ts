import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PieceService } from '../../../services/GestionDeStocks/pieceService.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Piece } from '../../../models/GestionDeStocks/piece';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Table } from 'primeng/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-piecelist',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    RouterModule,
    FileUploadModule,
    FormsModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
   ReactiveFormsModule, 
    AutoCompleteModule,
    ConfirmDialogModule,
    SplitButtonModule,
    NgxSpinnerModule,

  ],
  templateUrl: './piecelist.component.html',
  styleUrl: './piecelist.component.scss'
})
export class PiecelistComponent implements OnInit {
  pieces: Piece[] = [];
  showDialog: boolean = false;
  filteredPieces: Piece[];
  cols:any;
  constructor(
    private route: ActivatedRoute, 
    private pieceService: PieceService) { }

  ngOnInit(): void {
    this.getpiece();
  }

  async getpiece(): Promise<void> {
    this.pieceService.getAllPieces().subscribe(response => {
      // Vérifie si la propriété 'pieces' existe et si elle est de type 'Piece[]'
      if (response && Array.isArray(response.pieces)) {
        this.pieces = response.pieces;
        console.log(this.pieces);
      } else {
        console.error('La réponse de l\'API est invalide :', response);
      }
    }, error => {
      console.error('Une erreur est survenue lors de la récupération des pièces :', error);
    });
  }
  showDialogToAdd() {
    this.showDialog = true; // Afficher la boîte de dialogue pour ajouter une pièce
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  confirmDeletePiece(piece: Piece): void {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cette pièce ?');
    if (confirmDelete) {
      this.pieceService.deletePiece(piece.piece_id).subscribe(
        () => {
          this.pieces = this.pieces.filter(p => p.piece_id !== piece.piece_id);
          this.showDialog = false; // Fermer la boîte de dialogue si elle est ouverte
        },
        error => {
          console.error('Erreur lors de la suppression de la pièce :', error);
          // Afficher un message d'erreur à l'utilisateur si nécessaire
        }
      );
    }
  }
  
  }