import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; // Supprimez NgModel de cet import
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Societe } from 'src/app/core/models/societe';
import { SocieteService } from 'src/app/core/services/societe.service';
@Component({
  selector: 'app-updatesociete',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Conservez FormsModule ici pour utiliser ngModel
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './updatesociete.component.html',
  styleUrl: './updatesociete.component.scss'
})
export class UpdatesocieteComponent implements OnInit {
  SocieteID: number;
  societe: Societe;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private socservice: SocieteService
  ) {
    this.societe ; // Initialiser un nouvel objet Fournisseur
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.SocieteID = +params.get('id');
      this.loadSociete(this.SocieteID);
    });
  }

  loadSociete(id: number): void {
    this.socservice.getSocieteById(id).subscribe(
      (response: any) => {
        this.societe = response;
        console.log(response);
      },
      error => {
        console.error('Une erreur est survenue lors du chargement du societe:', error);
      }
    );
  }

  onSubmit(): void {
    console.log(this.societe); // Affichez l'objet Fournisseur dans la console
    
    // Vérifiez que les valeurs de l'objet fournisseur sont valides (vous devrez peut-être implémenter une méthode de validation dans la classe Fournisseur)
      this.isLoading = true;
      this.socservice.updateSociete(this.SocieteID, this.societe).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/listsociete']);
        },
        error => {
          this.isLoading = false;
          console.error('An error occurred while updating soc:', error);
        }
      );
    
  }
  
  // Méthode pour vérifier la validité des données du fournisseur
  socIsValid(): boolean {
    // Implémentez votre logique de validation ici
    // Par exemple, vérifiez si les propriétés obligatoires sont définies
    return !!this.societe.name && 
    !!this.societe.address && 
    !!this.societe.city &&
     !!this.societe.country&&
     !!this.societe.phone&&
     !!this.societe.email&&
     !!this.societe.website&&
     !!this.societe.contact_person&&
     !!this.societe.contact_phone&&
     !!this.societe.contact_email;

  }
  
}
