import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { Fournisseur } from '../../models/GestionDeStocks/Fournisseur';
import { FournisseurService } from '../../services/GestionDeStocks/fournisseur.service';

@Component({
  selector: 'app-fournisseur',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    RouterModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,RouterModule
  ],
  templateUrl: './fournisseur.component.html',
  styleUrl: './fournisseur.component.scss'
})
export class FournisseurComponent implements OnInit{

  fournisseurs: Fournisseur[] = [];
  showDialog = false; // Le type boolean est déduit automatiquement
  filteredFournisseur: Fournisseur[] = []; // Initialiser à un tableau vide

  constructor(
    private route: ActivatedRoute, 
    private router: Router, // Changer ActivatedRoute en Router
    private fournisseurservice: FournisseurService
  ) {}

  ngOnInit(): void {
    this.getFournisseur();
  }

  getFournisseur(): void {
    this.fournisseurservice.getFournisseurs().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.fournisseurs)) {
          this.fournisseurs = response.fournisseurs;
          this.filteredFournisseur = this.fournisseurs;
        } else {
          console.error("La réponse de l'API est invalide :", response);
        }
      },
      (error) => {
        console.error("Une erreur est survenue lors de la récupération des fournisseurs :", error);
      }
    );
  }
  

  showDialogToAdd(): void {
    this.showDialog = true; // Afficher la boîte de dialogue pour ajouter une location
  }

  filter(value: string): void {
    if (!value) {
      this.filteredFournisseur = this.fournisseurs;
    } else {
      this.filteredFournisseur = this.fournisseurs.filter(fournisseur => {
        return fournisseur.nom_fournisseur.toLowerCase().includes(value.toLowerCase());
        fournisseur.adresse.toLowerCase().includes(value.toLowerCase());
        fournisseur.email.toLowerCase().includes(value.toLowerCase());
        fournisseur.telephone.toLowerCase().includes(value.toLowerCase());
      });
    }
  }

  confirmDeleteFournisseur(fournisseur: Fournisseur): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce fournisseur ?")) {
      this.fournisseurservice.deleteFournisseur(fournisseur.fournisseur_id).subscribe(() => {
        this.getFournisseur(); // Recharger la liste des locations après la suppression
      });
    }
  }
}
