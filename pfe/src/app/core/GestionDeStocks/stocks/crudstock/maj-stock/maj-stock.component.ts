import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule ,Route, Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
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
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Piece } from 'src/app/core/models/GestionDeStocks/piece';
import { StockPiece } from 'src/app/core/models/GestionDeStocks/StockPiece';
import { EquipmentType } from 'src/app/core/models/equipement';
import { PieceService } from 'src/app/core/services/GestionDeStocks/pieceService.service';
import { StockService } from 'src/app/core/services/GestionDeStocks/stock.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { EquipmentTypeService } from 'src/app/core/services/equipements.service';
 // Assurez-vous de remplacer cela par le chemin réel

@Component({
  selector: 'app-maj-stock',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    FileUploadModule,
    RouterModule,
    DropdownModule, // Exemple d'importation supplémentaire
    AutoCompleteModule // Exemple d'importation supplémentaire
  ],
  
  templateUrl: './maj-stock.component.html',
  styleUrls: ['./maj-stock.component.scss']
})
export class MajStockComponent implements OnInit {
  stockForm: FormGroup;
  isLoading: boolean;
  equipements: EquipmentType[];
  pieces: Piece[];
  stockId: number;
  stock: StockPiece[];

  constructor(
    private fb: FormBuilder,
    private equipementService: EquipmentTypeService,
    private pieceService: PieceService,
    private stockService: StockService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private authservice : AuthService
  ) {}

  ngOnInit(): void {
    this.getStockDetails();
    this.getAllEquipements();
    this.getAllPieces();
    
    this.stockForm = this.fb.group({
      piece_id: ['', Validators.required],
      equipment_id: ['', Validators.required], // Renommé pour correspondre à la propriété de l'objet
      quantity: ['', Validators.required],
      reserved_quantity: ['', Validators.required],
      local: ['', Validators.required]
    });
  }

  getStockDetails(): void {
    this.stockId = +this.route.snapshot.paramMap.get('id');
    this.stockService.getStockPieceById(this.stockId).subscribe(
      (stock: StockPiece) => {
        this.stockForm.patchValue(stock);
        console.log(stock)
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du stock :', error);
      }
    );
  }

  getAllEquipements(): void {
    this.equipementService.getAllEquipmentTypes().subscribe((equipements: any) => {
      this.equipements = equipements;
      console.log(this.equipements);
    });
  }

  getAllPieces(): void {
    this.pieceService.getAllPieces().subscribe((response: any) => {
      this.pieces = response.pieces;
    });
  }

  onSubmit(): void {
    if (this.stockForm.valid) {
      const updatedStock: StockPiece = this.stockForm.value;
      updatedStock.stock_id = this.stockId;
      updatedStock.modify_by = Number(this.authservice.getUserID());
      this.isLoading = true;
      this.stockService.updateStockPiece(this.stockId, updatedStock).subscribe(
        (response: StockPiece) => {
          console.log('Stock mis à jour avec succès :', response);
          this.isLoading = false;
          this.showSuccess();
          this.router.navigate(['/stocks']);
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour du stock :', error);
          this.isLoading = false;
        }
      );
    }
  }

  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Stock mis à jour avec succès' });
  }
}