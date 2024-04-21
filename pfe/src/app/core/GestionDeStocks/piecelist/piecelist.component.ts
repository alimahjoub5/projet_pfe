import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PieceService } from '../../services/GestionDeStocks/pieceService.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Piece } from '../../models/GestionDeStocks/piece';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-piecelist',
  standalone: true,
  imports: [
  TableModule,
  CommonModule,
  ButtonModule,
  InputTextModule,
  RouterModule
  ],
  templateUrl: './piecelist.component.html',
  styleUrl: './piecelist.component.scss'
})
export class PiecelistComponent implements OnInit {
  pieces: Piece[] = [];
  showDialog: boolean = false;
  filteredPieces: Piece[];

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

  filter(value: string) {
    if (!value) {
      this.filteredPieces = this.pieces;
    } else {
      this.filteredPieces = this.pieces.filter(piece => {
        return piece.nom_piece.toLowerCase().includes(value.toLowerCase()) || 
               piece.description.toLowerCase().includes(value.toLowerCase()) ||
               piece.material.toLowerCase().includes(value.toLowerCase()) ||
               piece.serial_number.toLowerCase().includes(value.toLowerCase()) ||
               piece.cost.toString().toLowerCase().includes(value.toLowerCase()) ||
               piece.fournisseur_id.toString().toLowerCase().includes(value.toLowerCase());
      });
    }
  }
  confirmDeletePiece(piece: Piece): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette pièce ?')) {
      this.pieceService.deletePiece(piece.piece_id)
        .subscribe(() => {
          this.getpiece();
        });
    }
  }
  
  }