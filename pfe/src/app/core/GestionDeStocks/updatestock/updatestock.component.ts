import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { StockService } from '../../services/GestionDeStocks/StockService.service';
import { Stock } from '../../models/GestionDeStocks/stocks';

@Component({
  selector: 'app-updatestock',
  templateUrl: './updatestock.component.html',
  standalone : true,
  imports: [FormsModule,CommonModule],
  styleUrls: ['./updatestock.component.scss']
})
export class UpdatestockComponent implements OnInit {
  stockId: number;
  stock: Stock;

  constructor(private route: ActivatedRoute, private router: Router, private stockService: StockService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.stockId = +params['stock_id'];
      this.getStock(this.stockId);
    });
  }

  getStock(id: number): void {
    this.stockService.getStockById(id)
      .subscribe((response: any) => {
        this.stock = response.stock;
      });
  }

  updateStock(): void {
    this.stockService.updateStock(this.stockId, this.stock)
      .subscribe(() => {
        this.router.navigate(['/liststock']); // Rediriger vers la liste des stocks après la mise à jour
      });
  }
}
