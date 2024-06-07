import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fournisseur } from 'src/app/core/models/GestionDeStocks/Fournisseur';
import { FournisseurService } from 'src/app/core/services/GestionDeStocks/fournisseur.service';
@Component({
  selector: 'app-detailsfourni',
  standalone: true,
  imports: [],
  templateUrl: './detailsfourni.component.html',
  styleUrl: './detailsfourni.component.scss'
})
export class DetailsfourniComponent implements OnInit{
    fournisseur_id: number;
    fournisseur: Fournisseur | undefined;
    isLoading = false;
  
    constructor(private route: ActivatedRoute, private fournisseurService: FournisseurService) { }
  
    ngOnInit(): void {
      this.fournisseur_id = +this.route.snapshot.paramMap.get('id');
      this.getFournisseurDetails(this.fournisseur_id);
    }
  
    getFournisseurDetails(fournisseur_id: number): void {
      this.isLoading = true; // Afficher le spinner avant de récupérer les données
      this.fournisseurService.getFournisseurById(fournisseur_id).subscribe({
        next: (fournisseur: Fournisseur) => {
          this.fournisseur = fournisseur;
          this.isLoading = false; // Cacher le spinner après la récupération des données
        },
        error: (err: any) => {
          this.isLoading = false; // Cacher le spinner en cas d'erreur
          console.error('Error fetching fournisseur details:', err);
        }
      });
    }
  
    printDocument(): void {
      window.print();
    }
  }