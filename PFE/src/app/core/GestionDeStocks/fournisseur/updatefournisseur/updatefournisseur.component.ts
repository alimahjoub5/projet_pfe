import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Fournisseur } from 'src/app/core/models/GestionDeStocks/Fournisseur';
import { FournisseurService } from 'src/app/core/services/GestionDeStocks/fournisseur.service';

@Component({
  selector: 'app-updatefournisseur',
  templateUrl: './updatefournisseur.component.html',
  styleUrls: ['./updatefournisseur.component.scss'],
  standalone:true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
})
export class UpdatefournisseurComponent implements OnInit {
  fournisseurId: number;
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
      this.fournisseurId = +params.get('id');
      this.loadFournisseur(this.fournisseurId);
    });

    this.fournisseurForm = this.formBuilder.group({
      nom_fournisseur: [{ value: '', disabled: true }, Validators.required], // Champ désactivé
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      // Ajoutez d'autres champs du formulaire selon vos besoins
    });
  }
  loadFournisseur(id: number): void {
    this.fournisseurservice.getFournisseurById(id).subscribe(
      (fournisseur: Fournisseur) => {
        this.fournisseur = fournisseur;
        console.log(this.fournisseur);
      },
      error => {
        console.error('Une erreur est survenue lors du chargement du fournisseur:', error);
      }
    );
  }
  
  onSubmit(): void {
    if (this.fournisseurForm.valid) {
      const formData = this.fournisseurForm.value;
      this.isLoading = true;
      this.fournisseurservice.updateFournisseur(this.fournisseurId, formData).subscribe(
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
