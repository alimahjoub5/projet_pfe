import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { LocationService } from '../../services/GestionDeStocks/location.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Modifier RouterModule en Router
import { Location } from '../../models/GestionDeStocks/Location';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-location',
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
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  locations: Location[] = [];
  showDialog = false; // Le type boolean est déduit automatiquement
  filteredLocation: Location[] = []; // Initialiser à un tableau vide

  constructor(
    private route: ActivatedRoute, 
    private router: Router, // Changer ActivatedRoute en Router
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation(): void {
    this.locationService.getLocations().subscribe(
      (response: any) => {
        if (response && Array.isArray(response)) { // Modifier response.locations en response
          this.locations = response; // Modifier response.locations en response
          this.filteredLocation = this.locations; // Mettre à jour les locations filtrées
        } else {
          console.error("La réponse de l'API est invalide :", response);
        }
      },
      (error) => {
        console.error("Une erreur est survenue lors de la récupération des locations :", error);
      }
    );
  }

  showDialogToAdd(): void {
    this.showDialog = true; // Afficher la boîte de dialogue pour ajouter une location
  }

  filter(value: string): void {
    if (!value) {
      this.filteredLocation = this.locations;
    } else {
      this.filteredLocation = this.locations.filter(location => {
        return location.name.toLowerCase().includes(value.toLowerCase());
      });
    }
  }

  confirmDeleteLocation(location: Location): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette location ?")) {
      this.locationService.deleteLocation(location.location_id).subscribe(() => {
        this.getLocation(); // Recharger la liste des locations après la suppression
      });
    }
  }
}
