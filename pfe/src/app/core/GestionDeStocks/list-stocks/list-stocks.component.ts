import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/GestionDeStocks/StockService.service';
import { Stock } from '../../models/GestionDeStocks/stocks';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SortEvent, SortMeta } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-stocks',
  templateUrl: './list-stocks.component.html',
  styleUrls: ['./list-stocks.component.scss'], // Correction du nom de la propriété styleUrl à styleUrls
  standalone: true, // Déplacement de standalone après styleUrls
  imports: [CommonModule, TableModule, ButtonModule,RouterModule],
})
export class ListStocksComponent implements OnInit {
  stocks: Stock[] = []; // Correction pour déclarer stocks comme un tableau de Stock[]
  multiSortMeta: SortMeta[] = [];
  allStocks: Stock[] = []; // Correction pour déclarer allStocks comme un tableau de Stock[] et l'initialiser

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getStocks();
  }

  getStocks(): void {
    this.stockService.getAllStocks()
      .subscribe((response: any) => {
        this.stocks = response.stocks;

        // Déterminez le statut pour chaque stock en fonction de la quantité
        this.stocks.forEach(stock => {
          if (stock.quantite === 0) {
            stock.statut = 'Indisponible';
          } else if (stock.quantite <= 5) {
            stock.statut = 'Faible';
          } else {
            stock.statut = 'Disponible';
          }
        });
      });
  }

  onSort(event: SortEvent): void {
    // Effacer les tri précédents
    this.multiSortMeta = [];

    // Ajouter les informations de tri actuelles
    event.multiSortMeta.forEach(meta => {
      this.multiSortMeta.push(meta);
    });

    // Charger les données en fonction du tri
    // this.loadStocks();
  }

  filter(value: string) {
    // Utilisez la méthode filter sur votre tableau de stocks
    this.stocks = this.allStocks.filter(stock =>
      stock.nom_piece.toLowerCase().includes(value.toLowerCase()) ||
      stock.description.toLowerCase().includes(value.toLowerCase()) ||
      String(stock.quantite).includes(value.toLowerCase())
    );
  }


  deleteStock(stock_id: number) {
    if (confirm('Are you sure you want to delete this stock?')) {
      this.stockService.deleteStock(stock_id).subscribe(() => {
        this.getStocks();
      });
    }
  }
}
