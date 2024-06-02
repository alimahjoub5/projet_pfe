import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Groupe } from 'src/app/core/models/groupe';
import { GroupeService } from 'src/app/core/services/groupe.service';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-updategrp',
  templateUrl: './updategrp.component.html',
  styleUrls: ['./updategrp.component.scss'],
  standalone:true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,ToastModule],

})
export class UpdategrpComponent implements OnInit {
  groupe: Groupe ;
  GroupID: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupeservice: GroupeService,
    private authservice : AuthService,
    private messageService :MessageService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.GroupID = params.get('GroupID');
      this.groupeservice.getGroupeById(Number(this.GroupID)).subscribe(groupe => {
        this.groupe = groupe;
      });
    });
  }
  onCancel(): void {
    // Réinitialiser le formulaire

    this.router.navigate(['/groupelist']);
}
  updateGroupe(): void {
    this.groupeservice.updateGroupe(Number(this.GroupID), this.groupe).subscribe(updatedGroupe => {
      console.log('Groupe updated successfully:', updatedGroupe);
      this.showSuccess();
    });
}
showSuccess(): void {
  this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Groupe a été mise à jour avec succès' });
}
}