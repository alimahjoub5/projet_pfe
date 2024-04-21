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

  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentTypeService,
    private pieceService: PieceService
  ) { }

  ngOnInit(): void {
    this.loadPiece();
    this.loadEquipmentTypes();
    this.stockPieceForm = this.fb.group({
      piece_id: [''],
      equipment_id: [''],
      quantity: [''],
      reserved_quantity: [''],
      local: [''],
    });
    console.log(this.pieces);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('piece_id', this.stockPieceForm.get('piece_id').value);
    formData.append('equipment_id', this.value);
    formData.append('quantity', this.stockPieceForm.get('quantity').value);
    formData.append('local', this.stockPieceForm.get('local').value);
    console.log(formData);
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
        this.pieces = response.pieces;
        console.log(response.pieces);
        console.log(this.pieces);
      } else {
        console.error('La réponse de l\'API est invalide :', response);
      }
    }, error => {
      console.error('Une erreur est survenue lors de la récupération des pièces :', error);
    });
  }

  filterPieceTypes(event: any): void {
    let filtered: Piece[] = [];
    let query = event.query;

    if (Array.isArray(this.pieces)) {
      filtered = this.pieces.filter((piece: Piece) => {
        return piece.nom_piece.toLowerCase().startsWith(query.toLowerCase());
      });
    }

    this.filteredPieces = filtered;
  }

  onPieceSelect(event: any): void {
    this.selectedPiece = event.value;
    if (this.selectedPiece) {
      this.stockPieceForm.controls['piece_id'].setValue(this.selectedPiece.piece_id);
    }
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
    }
  }


  
  
}
