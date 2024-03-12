import { Component , OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MenuItem} from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {RouterModule , ROUTES} from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Groupe } from 'src/app/core/models/groupe';
import { GroupeService } from 'src/app/core/services/groupe.service';

@Component({
  selector: 'app-groupelist',
  standalone: true,
  imports: [FormsModule,
    ButtonModule,
     ReactiveFormsModule, 
    AutoCompleteModule,
    TableModule,DialogModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    SplitButtonModule,
    RouterModule,
    NgxSpinnerModule,
CommonModule],
  templateUrl: './groupelist.component.html',
  styleUrls: ['./groupelist.component.scss']
})
export class GroupelistComponent implements OnInit {
  groupes: Groupe[];
  isLoading: boolean;

  constructor(
    private groupeService: GroupeService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadGroupes();
  }

  loadGroupes(): void {
    this.isLoading = true;
    this.spinner.show(); // Afficher le spinner avant de récupérer les données

    this.groupeService.getAllGroupes().subscribe(
      groupes => {
        this.groupes = groupes;
        this.isLoading = false;
        this.spinner.hide(); // Masquer le spinner après le chargement des données
      },
      error => {
        console.error('Erreur lors du chargement des groupes :', error);
        this.isLoading = false;
        this.spinner.hide(); // Assurez-vous de cacher le spinner en cas d'erreur
      }
    );
  }

  deleteGroupe(groupId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce groupe ?')) {
      this.groupeService.deleteGroupe(groupId).subscribe(() => {
        this.loadGroupes(); // Recharger la liste des groupes après la suppression
      });
    }
  }
}
