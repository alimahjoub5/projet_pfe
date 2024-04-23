import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { LocationService } from 'src/app/core/services/GestionDeStocks/location.service';
import { Location } from 'src/app/core/models/GestionDeStocks/Location';
@Component({
  selector: 'app-updatelocation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Importez FormsModule ici
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './updatelocation.component.html',
  styleUrl: './updatelocation.component.scss'
})
export class UpdatelocationComponent implements OnInit{
  location_id: number;
  location: Location;
  localForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationservice: LocationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.location_id = +params.get('id');
      this.loadlocal(this.location_id);
    });

    this.localForm = this.formBuilder.group({
      name: ['', Validators.required],
     
      // Ajoutez d'autres champs du formulaire selon vos besoins
    });
  }

  loadlocal(id: number): void {
    this.locationservice.getLocationById(id).subscribe(
      (location: Location) => {
        this.location = location;
        // Pré-remplir le formulaire avec les données de la pièce
        this.localForm.patchValue({
          name: this.location.name,
         
          // Assurez-vous d'ajouter d'autres champs ici si nécessaire
        });
      },
      error => {
        console.error('Une erreur est survenue lors du chargement de la pièce:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.localForm.valid) {
      const formData = this.localForm.value;
      this.isLoading = true;
      this.locationservice .updateLocation(this.location_id, formData).subscribe(
        () => {
          this.isLoading = false;
          // Rediriger vers la liste des pièces après la mise à jour
          this.router.navigate(['/location']);
        },
        error => {
          this.isLoading = false;
          console.error('Une erreur est survenue lors de la mise à jour du local:', error);
        }
      );
    }
  }
}
