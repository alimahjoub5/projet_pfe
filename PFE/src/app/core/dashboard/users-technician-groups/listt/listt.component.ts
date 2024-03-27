
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
import { PriorityService } from 'src/app/core/services/priority.service';
import { Priority } from 'src/app/core/models/Priority';
import { Usertech } from 'src/app/core/models/user-tech';
import { UsersTechnicianGroupsService } from 'src/app/core/services/user-tech.service';
@Component({
 selector: 'app-listt',
  
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
templateUrl: './listt.component.html',
styleUrl: './listt.component.scss'
})




export class ListtComponent  implements OnInit {
  userstech: Usertech;
  isLoading: boolean;
cols: any;

  constructor(
    private usertechservice: UsersTechnicianGroupsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadTech();
  }

  loadTech(): void {
    this.isLoading = true;
    this.spinner.show(); // Afficher le spinner avant de récupérer les données

    this.usertechservice.getUsersTechnicianGroups().subscribe(
      userstech => {
        this.userstech = userstech;
        this.isLoading = false;
        console.log(userstech);
        this.spinner.hide(); // Masquer le spinner après le chargement des données
      },
      error => {
        console.error('Erreur lors du chargement des priorités :', error);
        this.isLoading = false;
        this.spinner.hide(); // Assurez-vous de cacher le spinner en cas d'erreur
      }
    );
  }

  removeUserFromGroup(UserID: number , GroupID:number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce user ?')) {
      this.usertechservice.removeUserFromGroup(UserID,GroupID).subscribe(() => {
        this.loadTech(); // Recharger la liste des priorités après la suppression
      });
    }
  }
} {

}