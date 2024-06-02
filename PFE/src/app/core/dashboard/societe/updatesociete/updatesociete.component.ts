import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; // Supprimez NgModel de cet import
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Societe } from 'src/app/core/models/societe';
import { SocieteService } from 'src/app/core/services/societe.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-updatesociete',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Conservez FormsModule ici pour utiliser ngModel
    ReactiveFormsModule,
    RouterModule,ToastModule
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
    private socservice: SocieteService,
    private messageService :MessageService
  ) {
    this.societe ; // Initialiser un nouvel objet Fournisseur
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.SocieteID = +params.get('id');
      this.loadSociete(this.SocieteID);
    });
  }
  onCancel(): void {
    // Réinitialiser le formulaire

    this.router.navigate(['/listsociete']);
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
      this.socservice.updateSociete(Number(this.SocieteID), this.societe).subscribe(updatedSoc => {

        console.log('societe updated successfully:', updatedSoc);
        this.showSuccess();
        },
      );
    
  }
  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'societe a été mise à jour avec succès' });
  }
  
}
