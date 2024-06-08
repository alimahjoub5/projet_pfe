import { Component, OnInit } from '@angular/core';
import { StockPiece } from '../../models/GestionDeStocks/StockPiece';
import { StockService } from '../../services/GestionDeStocks/stock.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-stocks',
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
    RouterModule,
    NgxSpinnerModule,

  ],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss'
})
export class StockComponent implements OnInit {
  stockPieces: StockPiece[] = [];
  filteredStockPieces: StockPiece[] = [];
  searchText: string;
  cols:any;
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.loadStockPieces();
  }

  loadStockPieces() {
    this.stockService.getStockPieces().subscribe(data => {
      this.stockPieces = data;
    });
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
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
  
  
  deleteStockPiece(stockPieces: StockPiece): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce stock ?')) {
      this.stockService.deleteStockPiece(stockPieces.stock_id)
        .subscribe(() => {
          this.loadStockPieces();
        });
    }
  }
}
