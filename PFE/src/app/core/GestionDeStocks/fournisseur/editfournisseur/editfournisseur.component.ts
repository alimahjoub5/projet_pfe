import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Fournisseur } from 'src/app/core/models/GestionDeStocks/Fournisseur';
import { FournisseurService } from 'src/app/core/services/GestionDeStocks/fournisseur.service';

@Component({
  selector: 'app-editfournisseur',
  standalone: true,
  imports: [ CommonModule,
    FormsModule, // Importez FormsModule ici
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './editfournisseur.component.html',
  styleUrl: './editfournisseur.component.scss'
})
export class EditfournisseurComponent {
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
      this.fournisseur_id = +params.get('id');
      this.loadfournisseur(this.fournisseur_id);
    });

    this.fournisseurForm = this.formBuilder.group({
      nom_fournisseur: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],

      // Ajoutez d'autres champs du formulaire selon vos besoins
    });
  }

  loadfournisseur(id: number): void {
    this.fournisseurservice.getFournisseurById(id).subscribe(
      (fournisseur) => {
        this.fournisseur = fournisseur;
        console.log(this.fournisseur);
        // Pré-remplir le formulaire avec les données de la pièce
        this.fournisseurForm.patchValue({
          nom_fournisseur: this.fournisseur.nom_fournisseur,
          adresse: this.fournisseur.adresse,
          email: this.fournisseur.email,
          telephone: this.fournisseur.telephone,
          // Assurez-vous d'ajouter d'autres champs ici si nécessaire
        });
      },
      error => {
        console.error('Une erreur est survenue lors du chargement de la pièce:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.fournisseurForm.valid) {
      const formData = this.fournisseurForm.value;
      this.isLoading = true;
      this.fournisseurservice .updateFournisseur(this.fournisseur_id, formData).subscribe(
        () => {
          this.isLoading = false;
          // Rediriger vers la liste des pièces après la mise à jour
          this.router.navigate(['/fournisseur']);
        },
        error => {
          this.isLoading = false;
          console.error('Une erreur est survenue lors de la mise à jour du local:', error);
        }
      );
    }
  }
}
