import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StockService } from 'src/app/core/services/GestionDeStocks/stock.service';
import { StockPiece } from 'src/app/core/models/GestionDeStocks/StockPiece';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Piece } from 'src/app/core/models/GestionDeStocks/piece';
import { EquipmentType } from 'src/app/core/models/equipement';
import { LocationService } from 'src/app/core/services/GestionDeStocks/location.service';
import { PieceService } from 'src/app/core/services/GestionDeStocks/pieceService.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { EquipmentTypeService } from 'src/app/core/services/equipements.service';
 // Assurez-vous de remplacer cela par le chemin réel

@Component({
  selector: 'app-maj-stock',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Utilisation de ReactiveFormsModule au lieu de FormsModule
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    FileUploadModule,
    RouterModule,
    DropdownModule,
    AutoCompleteModule
  ],
  templateUrl: './maj-stock.component.html',
  styleUrls: ['./maj-stock.component.scss']
})
export class MajStockComponent implements OnInit {
  stockPieceForm: FormGroup;
  equipmentTypes: EquipmentType[];
  filteredEquipmentTypes: EquipmentType[];
  selectedEquipmentType: EquipmentType;
  value: any;
  filteredPieces: Piece[];
  selectedPiece: Piece;
  pieces: any;
  locations: Location[];
  selectedLocation: Location;
  eqId: number;
  idpiece: number;
  locname: number;
  router: Router;
  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentTypeService,
    private pieceService: PieceService,
    private stockService: StockService,
    private locationService: LocationService,
    private authservice: AuthService



  ) { }

  ngOnInit(): void {
    this
  }

  
  
}

