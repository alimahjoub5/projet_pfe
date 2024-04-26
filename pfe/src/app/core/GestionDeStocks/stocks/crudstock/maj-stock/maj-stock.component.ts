import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from 'src/app/core/services/GestionDeStocks/stock.service';
import { StockPiece } from 'src/app/core/models/GestionDeStocks/StockPiece';
 // Assurez-vous de remplacer cela par le chemin réel

@Component({
  selector: 'app-maj-stock',
  templateUrl: './maj-stock.component.html',
  styleUrls: ['./maj-stock.component.scss']
})
export class MajStockComponent implements OnInit {
  pieceId: number;
  stockpiece: StockPiece;
  stockForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stockService: StockService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    
 
 
  }

  
}
