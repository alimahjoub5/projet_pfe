import { Component, OnInit } from '@angular/core';
import { StockPiece } from '../../models/GestionDeStocks/StockPiece';
import { StockService } from '../../services/GestionDeStocks/stock.service';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
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
  selector: 'app-stocks',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    RouterModule,
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
  ],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss'
})
export class StockComponent implements OnInit {
  stockPieces: StockPiece[] = [];
  filteredStockPieces: StockPiece[] = [];
  searchText: string;
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.loadStockPieces();
  }

  loadStockPieces() {
    this.stockService.getStockPieces().subscribe(data => {
      this.stockPieces = data;
    });
  }


  filter(searchText: string) {
    this.filteredStockPieces = this.stockPieces.filter(stockPiece => {
      return (
        stockPiece.stock_id.toString().includes(searchText) ||
        stockPiece.piece_id.toString().includes(searchText) ||
        stockPiece.equipment_id.toString().includes(searchText) ||
        stockPiece.quantity.toString().includes(searchText) ||
        stockPiece.reserved_quantity.toString().includes(searchText) ||
        stockPiece.local.toLowerCase().includes(searchText.toLowerCase()) ||
        stockPiece.created_by.toString().includes(searchText) ||
        stockPiece.modify_by.toString().includes(searchText)
      );
    });
  }

  clearFilter() {
    this.searchText = '';
    this.filter('');
  }

  editStockPiece(stockPiece: StockPiece) {
    // Implémentez la logique pour éditer un stock de pièces
  }

  deleteStockPiece(stockPieces: StockPiece) {
    if (confirm('Êtes-vous sûr de vouloir supprimer  ?')) {
      this.stockService.deleteStockPiece(stockPieces.stock_id)
        .subscribe(() => {
          this.loadStockPieces();
        });
    }  }
 
}
