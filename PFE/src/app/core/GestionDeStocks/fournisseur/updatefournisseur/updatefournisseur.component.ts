import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Fournisseur } from 'src/app/core/models/GestionDeStocks/Fournisseur';
import { FournisseurService } from 'src/app/core/services/GestionDeStocks/fournisseur.service';
@Component({
  selector: 'app-updatefournisseur',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Importez FormsModule ici
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './updatefournisseur.component.html',
  styleUrl: './updatefournisseur.component.scss'
})
export class UpdatefournisseurComponent implements OnInit {
  fournisseur_id: number;
  fournisseur: Fournisseur;
  fournisseurForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fournisseurservice: FournisseurService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.fournisseur_id = Number(params.get('id')); // Convertir l'ID en nombre
      this.loadFournisseur(this.fournisseur_id);
    });

    this.fournisseurForm = this.formBuilder.group({
      nom_fournisseur: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      // Ajouter d'autres champs du formulaire selon vos besoins et règles de validation
    });
  }

  loadFournisseur(id: number): void {
    this.fournisseurservice.getFournisseurById(id).subscribe(
      (fournisseur: any) => {
        this.fournisseur = fournisseur;
        this.patchFormValues(); // Appeler la fonction pour pré-remplir le formulaire
        console.log(this.fournisseur);

      },
      error => {
        console.error('Une erreur est survenue lors du chargement du fournisseur:', error);
      }
    );
  }
  patchFormValues(): void {
    this.fournisseurForm.patchValue({
      nom_fournisseur: this.fournisseur.nom_fournisseur,
      adresse: this.fournisseur.adresse,
      email: this.fournisseur.email,
      telephone: this.fournisseur.telephone,
      // Assurez-vous d'ajouter d'autres champs ici si nécessaire
    });
  }


  onSubmit(): void {
    if (this.fournisseurForm.valid) {
      const formData = this.fournisseurForm.value;
      this.isLoading = true;
      this.fournisseurservice.updateFournisseur(this.fournisseur_id, formData).subscribe(
        () => {
          this.isLoading = false;
          // Rediriger vers la liste des fournisseurs après la mise à jour
          this.router.navigate(['/fournisseur']);
        },
        error => {
          this.isLoading = false;
          console.error('Une erreur est survenue lors de la mise à jour du fournisseur:', error);
        }
      );
    }
  }
}