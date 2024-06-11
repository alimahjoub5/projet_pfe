import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Usertech } from 'src/app/core/models/user-tech';
import { AuthService } from 'src/app/core/services/auth.service';
import { GroupeService } from 'src/app/core/services/groupe.service';
import { UsersTechnicianGroupsService } from 'src/app/core/services/user-tech.service';

@Component({
  selector: 'app-grp',
  standalone: true,
  imports: [
    TableModule,
    ToastModule,
    ToolbarModule,
    NgxSpinnerModule
  ],
  templateUrl: './grp.component.html',
  styleUrl: './grp.component.scss'
})
export class GrpComponent implements OnInit {
  membres: Usertech[];
  cols: any[];

  constructor(
    private spinner: NgxSpinnerService,
    private groupe: UsersTechnicianGroupsService,
    private auth : AuthService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'FirstName', header: 'Prénom' },
      { field: 'LastName', header: 'Nom' },
      { field: 'Email', header: 'Email' }
    ];

    this.loadGroupMembers();
  }

  loadGroupMembers(): void {
    this.spinner.show();
    this.groupe.getUserGroups(Number(this.auth.getUserID())).subscribe(
      (data: Usertech[]) => {
        console.log(data)
        this.membres = data;
        this.spinner.hide();
      },
      error => {
        console.error('Erreur lors de la récupération des membres du groupe', error);
        this.spinner.hide();
      }
    );
  }
}