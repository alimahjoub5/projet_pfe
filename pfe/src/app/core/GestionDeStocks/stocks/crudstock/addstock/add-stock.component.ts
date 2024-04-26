import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Suppression de FormsModule et Validators car ils ne sont pas utilisés dans ce fichier
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
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
export class StockFormComponent implements OnInit {
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
  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentTypeService,
    private pieceService: PieceService,
    private stockService: StockService,
    private locationService: LocationService,
    private authservice: AuthService



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

    // Créer un objet StockPiece à partir des valeurs du formulaire
    const stockPiece: StockPiece = {
      piece_id: this.selectedPiece.piece_id,
      equipment_id: this.value,
      quantity: formData.quantity,
      reserved_quantity: null,
      local: this.selectedLocation.name,
      created_by: Number(this.authservice.getUserID()),
      location_id: undefined
    };

    console.log(stockPiece);
    // Appeler la méthode createStockPiece du service StockService
    this.stockService.createStockPiece(stockPiece).subscribe(
      (response) => {
        console.log('Stock de pièces créé avec succès :', response);
        // Réinitialiser le formulaire après la soumission réussie
        this.stockPieceForm.reset();
      },
      (error) => {
        console.error('Erreur lors de la création du stock de pièces :', error);
      }
    );
  }


  loadLocations(): void {
    this.locationService.getLocations().subscribe(
      (locations: Location[]) => {
        this.locations = locations;
        console.log(this.locations);
      },
      (error: any) => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  onLocationSelect(event: any): void {
    this.selectedLocation = event.value;
    if (this.selectedLocation) {
      this.stockPieceForm.controls['local'].setValue(this.selectedLocation.name);
      this.locname=this.selectedLocation.location_id;
    }
  }


  loadEquipmentTypes(): void {
    this.equipmentService.getAllEquipmentTypes().subscribe(
      (equipmentTypes: EquipmentType[]) => {
        this.equipmentTypes = equipmentTypes;
      },
      (error: any) => {
        console.error('Error fetching equipment types:', error);
      }
    );
  }

  loadPiece(): void {
    this.pieceService.getAllPieces().subscribe(response => {
      // Vérifie si la propriété 'pieces' existe et si elle est de type 'Piece[]'
      if (response && Array.isArray(response.pieces)) {
        this.filteredPieces = response.pieces;
        console.log(response.filteredPieces);
        console.log(this.filteredPieces);
      } else {
        console.error('La réponse de l\'API est invalide :', response);
      }
    }, error => {
      console.error('Une erreur est survenue lors de la récupération des pièces :', error);
    });
  }

  filterPieceTypes(event: any): void {
    let filtered: Piece[] = [];
    let query = event.query.toLowerCase(); // Convertir la requête en minuscules dès le début

    if (Array.isArray(this.pieces)) {
      filtered = this.pieces.filter((piece: Piece) => {
        // Vérifiez d'abord si la propriété nom_piece est une chaîne de caractères valide
        if (typeof piece.nom_piece === 'string' && typeof query === 'string') {
          // Utilisez toLowerCase() seulement si nom_piece est une chaîne de caractères
          return piece.nom_piece.toLowerCase().startsWith(query);
        }
        return false; // Retournez false si nom_piece n'est pas une chaîne de caractères valide
      });
    }

    this.filteredPieces = filtered;
}


  onPieceSelect(event: any): void {
    this.selectedPiece = event.value;
    if (this.selectedPiece) {
      this.stockPieceForm.controls['piece_id'].setValue(this.selectedPiece.piece_id);
    }
    this.idpiece=this.selectedPiece.piece_id;
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
      this.eqId=this.selectedEquipmentType.EquipmentTypeID;
    }
  }


  
  
}
