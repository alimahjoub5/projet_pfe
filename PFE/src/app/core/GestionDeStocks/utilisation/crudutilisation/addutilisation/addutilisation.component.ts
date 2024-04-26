import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Correction ici : ReactiveFormsModule est importé dans AppModule
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { UtilisationPieceService } from 'src/app/core/services/GestionDeStocks/utilisation-piece.service';
import { EquipmentType } from 'src/app/core/models/equipement';
import { Piece } from 'src/app/core/models/GestionDeStocks/piece';
import { MessageService } from 'primeng/api';

import { AuthService } from 'src/app/core/services/auth.service';
import { EquipmentTypeService } from 'src/app/core/services/equipements.service';
import { PieceService } from 'src/app/core/services/GestionDeStocks/pieceService.service';

@Component({
  selector: 'app-addutilisation',
  standalone: true,
  imports: [
    AutoCompleteModule,
    FormsModule,ReactiveFormsModule,
    CommonModule,
    NgxSpinnerModule, 
  ToastModule],
  templateUrl: './addutilisation.component.html',
  styleUrls: ['./addutilisation.component.scss']
})
export class AddutilisationComponent implements OnInit {
  utilisationform: FormGroup;
  isLoading: boolean;
  equipements: EquipmentType[] = [];
  pieces: Piece[] = [];

  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentTypeService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private authservice: AuthService,
    private pieceservice: PieceService,
    private utilisationservice: UtilisationPieceService
  ) {}
  ngOnInit(): void {
    this.utilisationform = this.fb.group({
      EquipmentTypeID: [null, Validators.required],
      piece_id: [null, Validators.required],
      quantity_used: ['', Validators.required],
      date_utilisation: ['', Validators.required],
      description: [''],
    });
    
    this.getAllEquipements();
    this.getAllPieces();
  }

  getAllEquipements(): void {
    this.equipmentService.getAllEquipmentTypes().subscribe((equipements: EquipmentType[]) => {
      this.equipements = equipements;
    });
  }

  getAllPieces(): void {
    this.pieceservice.getAllPieces().subscribe((pieces: Piece[]) => {
      this.pieces = pieces;
    });
  }

  onSubmit(): void {
    if (this.utilisationform.valid) {
      const formData = new FormData();
      formData.append('EquipmentTypeID', this.utilisationform.get('EquipmentTypeID').value);
      formData.append('piece_id', this.utilisationform.get('piece_id').value);
      formData.append('quantity_used', this.utilisationform.get('quantity_used').value);
      formData.append('date_utilisation', this.utilisationform.get('date_utilisation').value);
      formData.append('description', this.utilisationform.get('description').value);

      this.isLoading = true;
      this.utilisationservice.createUtilisationPiece(formData).subscribe(
        (response: any) => {
          console.log('Utilisation créée avec succès :', response);
          this.utilisationform.reset();
          this.isLoading = false;
          this.showSuccess(); // Call the success message method
        },
        (error: any) => {
          console.error('Erreur lors de la création de l\'utilisation :', error);
          this.isLoading = false;
        }
      );
    }
  }

  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Utilisation créée avec succès' });
  }
}