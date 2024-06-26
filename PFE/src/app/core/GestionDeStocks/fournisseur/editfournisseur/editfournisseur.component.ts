import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; // Supprimez NgModel de cet import
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { c } from '@fullcalendar/core/internal-common';
import { MessageService } from 'primeng/api';
import { Fournisseur } from 'src/app/core/models/GestionDeStocks/Fournisseur';
import { FournisseurService } from 'src/app/core/services/GestionDeStocks/fournisseur.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-editfournisseur',
  standalone: true,
  imports: [ 
    CommonModule,
    FormsModule, // Conservez FormsModule ici pour utiliser ngModel
    ReactiveFormsModule,
    RouterModule,ToastModule
  ],
  templateUrl: './editfournisseur.component.html',
  styleUrl: './editfournisseur.component.scss'
})
export class EditfournisseurComponent implements OnInit {
  fournisseur_id: number;
  fournisseur: Fournisseur;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fournisseurService: FournisseurService,
    private messageService :MessageService
  ) {
    this.fournisseur ; // Initialiser un nouvel objet Fournisseur
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.fournisseur_id = +params.get('id');
      this.loadFournisseur(this.fournisseur_id);
    });
  }
  onCancel(): void {
    // Réinitialiser le formulaire

    this.router.navigate(['/fournisseur']);
}
  loadFournisseur(id: number): void {
    this.fournisseurService.getFournisseurById(id).subscribe(
      (response: any) => {
        this.fournisseur = response.fournisseur;
      },
      error => {
        console.error('Une erreur est survenue lors du chargement du fournisseur:', error);
      }
    );
  }

  onSubmit(): void {
    console.log(this.fournisseur); // Affichez l'objet Fournisseur dans la console
    
    // Vérifiez que les valeurs de l'objet fournisseur sont valides (vous devrez peut-être implémenter une méthode de validation dans la classe Fournisseur)
    if (this.fournisseurIsValid()) {
      this.isLoading = true;
      this.fournisseurService.updateFournisseur(this.fournisseur_id, this.fournisseur).subscribe(
        () => {
          this.isLoading = false;
          this.messageService.add({severity:'success', summary:'success', detail:'fournisseur a éte modifié avec succes'});
        },
        error => {
          this.isLoading = false;
          console.error('An error occurred while updating fournisseur:', error);
          this.messageService.add({severity:'error', summary:'Erreur', detail:error.error.message});

        }
      );
    } else {
      console.error('Invalid fournisseur data.');
    }
  }
  
  // Méthode pour vérifier la validité des données du fournisseur
  fournisseurIsValid(): boolean {
    // Implémentez votre logique de validation ici
    // Par exemple, vérifiez si les propriétés obligatoires sont définies
    return !!this.fournisseur.nom_fournisseur && !!this.fournisseur.adresse && !!this.fournisseur.email && !!this.fournisseur.telephone;
  }
  
}