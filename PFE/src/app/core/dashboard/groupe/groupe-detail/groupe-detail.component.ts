import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { GroupeService } from 'src/app/core/services/groupe.service';
import { Groupe } from 'src/app/core/models/groupe';

@Component({
  selector: 'app-groupe-detail',
  standalone : true,
  imports : [ProgressSpinnerModule,CommonModule],
  templateUrl: './groupe-detail.component.html',
  styleUrl: './groupe-detail.component.scss'
})
export class GroupeDetailComponent {

  GroupID: number;
  groupe: Groupe; // Définissez le type de votre utilisateur
  isLoading = false; 
  

  constructor(private route: ActivatedRoute, private groupeService: GroupeService) { }

  ngOnInit(): void {
    this.GroupID = +this.route.snapshot.paramMap.get('id');
    this.getGroupeDetails(this.GroupID);
  }

  getGroupeDetails(GroupID: number): void {
    this.isLoading = true; // Show spinner before fetching data
    this.groupeService.getGroupeById(GroupID).subscribe(groupe => {
      this.groupe = groupe;
      this.isLoading = false; // Hide spinner after data retrieval
    });
  }

  printDocument(): void {
    window.print();
  }
}

