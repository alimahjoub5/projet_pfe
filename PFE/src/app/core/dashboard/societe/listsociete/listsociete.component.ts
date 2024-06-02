import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Modifier RouterModule en Router
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Societe } from 'src/app/core/models/societe';
import { SocieteService } from 'src/app/core/services/societe.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SplitButtonModule } from 'primeng/splitbutton';
@Component({
  selector: 'app-listsociete',
  standalone: true,
  imports: [
     ReactiveFormsModule, 
    AutoCompleteModule,
    ConfirmDialogModule,
    SplitButtonModule,
     NgxSpinnerModule,
    TableModule,
    CommonModule,TableModule,
    InputTextModule, 
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
  templateUrl: './listsociete.component.html',
  styleUrl: './listsociete.component.scss'
})
export class ListsocieteComponent implements OnInit{

  societes: Societe[] = [];
  showDialog = false; // Le type boolean est déduit automatiquement
  filteredSocietes: Societe[] = []; // Initialiser à un tableau vide
  cols: any;
  constructor(
    private route: ActivatedRoute, 
    private router: Router, // Changer ActivatedRoute en Router
    private societeservice: SocieteService
  ) {}

  ngOnInit(): void {
    this.getSociete();
  }

  getSociete(): void {
    this.societeservice.getAllSocietes().subscribe(
      (response: any) => {
        if (response && Array.isArray(response)) { // Modifier response.locations en response
          this.societes = response; // Modifier response.locations en response
          this.filteredSocietes = this.societes; // Mettre à jour les locations filtrées
        } else {
          console.error("La réponse de l'API est invalide :", response);
        }
      },
      (error) => {
        console.error("Une erreur est survenue lors de la récupération des societes :", error);
      }
    );
  }

  showDialogToAdd(): void {
    this.showDialog = true; // Afficher la boîte de dialogue pour ajouter une location
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  confirmDeleteSocietes(societe: Societe): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette societe ?")) {
      this.societeservice.deleteSociete(societe.SocieteID).subscribe(() => {
        this.getSociete(); // Recharger la liste des locations après la suppression
      });
    }
  }
}
