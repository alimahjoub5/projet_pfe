import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Societe } from 'src/app/core/models/societe';
import { SocieteService } from 'src/app/core/services/societe.service';

@Component({
  selector: 'app-societedetails',
  standalone: true,
  imports: [ProgressSpinnerModule,CommonModule],
  templateUrl: './societedetails.component.html',
  styleUrl: './societedetails.component.scss'
})
export class SocietedetailsComponent {

  SocieteID: number;
  societe: Societe; // Définissez le type de votre utilisateur
  isLoading = false; 
  

  constructor(private route: ActivatedRoute, private socservice: SocieteService) { }

  ngOnInit(): void {
    this.SocieteID = +this.route.snapshot.paramMap.get('id');
    this.getSocdetails(this.SocieteID);
  }

  getSocdetails(GroupID: number): void {
    this.isLoading = true; // Show spinner before fetching data
    this.socservice.getSocieteById(this.SocieteID).subscribe(societe => {
      this.societe = societe;
      this.isLoading = false; // Hide spinner after data retrieval
    });
  }

  printDocument(): void {
    window.print();
  }
}

