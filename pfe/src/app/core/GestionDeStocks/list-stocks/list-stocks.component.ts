import { Component, OnInit } from '@angular/core';
import { Stock } from '../../models/GestionDeStocks/stocks';
import { StockService } from '../../services/GestionDeStocks/StockService.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-stocks',
  standalone: true,
  imports: [TableModule,ButtonModule,CommonModule],
  templateUrl: './list-stocks.component.html',
  styleUrl: './list-stocks.component.scss'
})
export class ListStocksComponent implements OnInit {

  stocks: Stock[];
  cols: any[];
  selectionMode: string;
  selectedStocks: Stock[];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'nom_piece', header: 'Nom de la pièce' },
      // Ajoutez d'autres colonnes si nécessaire
    ];
    this.selectionMode = 'multiple';
    this.selectedStocks = [];

    this.getAllStocks();
  }

  getAllStocks(): void {
    this.stockService.getAllStocks().subscribe(
      (data: Stock[]) => {
        console.log(data);

        this.stocks = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des stocks : ', error);
        // Gérer l'erreur ici
      }
    );
  }
  
  
}