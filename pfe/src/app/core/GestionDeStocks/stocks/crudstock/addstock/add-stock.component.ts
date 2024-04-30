import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Suppression de FormsModule et Validators car ils ne sont pas utilisés dans ce fichier
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { EquipmentTypeService } from 'src/app/core/services/equipements.service';
import { EquipmentType } from 'src/app/core/models/equipement';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { Piece } from 'src/app/core/models/GestionDeStocks/piece';
import { PieceService } from 'src/app/core/services/GestionDeStocks/pieceService.service';
import { StockService } from 'src/app/core/services/GestionDeStocks/stock.service';
import { StockPiece } from 'src/app/core/models/GestionDeStocks/StockPiece';
import { LocationService } from 'src/app/core/services/GestionDeStocks/location.service';
import { Location } from 'src/app/core/models/GestionDeStocks/Location';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-stocks',
  standalone: true, // Je n'ai pas modifié cela car je ne suis pas sûr de son utilisation, veuillez le vérifier
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
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss'] // Correction de la propriété styleUrl en styleUrls
})
export class AddStockComponent implements OnInit {
  stockPieceForm: FormGroup;
  equipmentTypes: EquipmentType[] = [];
  filteredEquipmentTypes: EquipmentType[] = [];
  selectedEquipmentType: EquipmentType | null = null;
  filteredPieces: Piece[] = [];
  selectedPiece: Piece | null = null;
  locations: Location[] = [];
  selectedLocation: Location | null = null;
  value: number | undefined;
  eqId: number | undefined;
  idpiece: number | undefined;
  locname: number | undefined;

  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentTypeService,
    private pieceService: PieceService,
    private stockService: StockService,
    private locationService: LocationService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPiece();
    this.loadEquipmentTypes();
    this.loadLocations();

    this.stockPieceForm = this.fb.group({
      piece_id: [''],
      equipment_id: [''],
      quantity: [''],
      reserved_quantity: [''],
      local: [''],
    });
  }

  onSubmit(): void {
    const formData = this.stockPieceForm.value;
    if (this.selectedPiece && this.selectedEquipmentType && this.selectedLocation) {
      const stockPiece: StockPiece = {
        piece_id: this.selectedPiece.piece_id,
        equipment_id: this.selectedEquipmentType.EquipmentTypeID,
        quantity: formData.quantity,
        reserved_quantity: null,
        local: this.selectedLocation.name,
        created_by: Number(this.authService.getUserID()),
        location_id: undefined
      };
      console.log(formData);

      this.stockService.createStockPiece(stockPiece).subscribe(
        (response) => {
          console.log('Stock de pièces créé avec succès :', response);
          this.router.navigate(['/stocks']);
          this.stockPieceForm.reset();
        },
        (error) => {
          console.error('Erreur lors de la création du stock de pièces :', error);
        }
      );
    } else {
      console.error('Veuillez sélectionner une pièce, un type d\'équipement et un emplacement.');
    }
  }

  loadLocations(): void {
    this.locationService.getLocations().subscribe(
      (locations: Location[]) => {
        this.locations = locations;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des emplacements :', error);
      }
    );
  }

  onLocationSelect(event: any): void {
    this.selectedLocation = event.value;
    if (this.selectedLocation) {
      this.stockPieceForm.patchValue({
        local: this.selectedLocation.name
      });
      this.locname = this.selectedLocation.location_id;
    }
  }
  
  onPieceSelect(event: any): void {
    this.selectedPiece = event.value;
    if (this.selectedPiece) {
      this.stockPieceForm.patchValue({
        piece_id: this.selectedPiece.piece_id
      });
      this.idpiece = this.selectedPiece.piece_id;
    }
  }
  

  loadEquipmentTypes(): void {
    this.equipmentService.getAllEquipmentTypes().subscribe(
      (equipmentTypes: EquipmentType[]) => {
        this.equipmentTypes = equipmentTypes;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des types d\'équipement :', error);
      }
    );
  }

  loadPiece(): void {
    this.pieceService.getAllPieces().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.pieces)) {
          this.filteredPieces = response.pieces;
        } else {
          console.error('La réponse de l\'API est invalide :', response);
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des pièces :', error);
      }
    );
  }

  filterPieceTypes(event: any): void {
    let filtered: Piece[] = [];
    let query = event.query.toLowerCase();

    if (Array.isArray(this.filteredPieces)) {
      filtered = this.filteredPieces.filter((piece: Piece) => {
        return piece.nom_piece.toLowerCase().startsWith(query);
      });
    }

    this.filteredPieces = filtered;
  }



  filterEquipmentTypes(event: any): void {
    let filtered: EquipmentType[] = [];
    let query = event.query;

    if (this.equipmentTypes) {
      filtered = this.equipmentTypes.filter((equipmentType: EquipmentType) => {
        const startsWithQuery = equipmentType.TypeName.toLowerCase().startsWith(query.toLowerCase());
        if (startsWithQuery) {
          this.value = equipmentType.EquipmentTypeID;
        }
        return startsWithQuery;
      });
    }

    this.filteredEquipmentTypes = filtered;
  }

  onEquipmentTypeSelect(event: any): void {
    this.selectedEquipmentType = event.value;
    if (this.selectedEquipmentType) {
      this.stockPieceForm.controls['equipment_id'].setValue(this.selectedEquipmentType.TypeName);
      this.eqId = this.selectedEquipmentType.EquipmentTypeID;
    }
  }
}