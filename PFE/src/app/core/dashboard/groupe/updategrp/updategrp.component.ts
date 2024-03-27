/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Groupe } from 'src/app/core/models/groupe';
import { GroupeService } from 'src/app/core/services/groupe.service';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updategrp',
  templateUrl: './updategrp.component.html',
  styleUrls: ['./updategrp.component.scss'],
  standalone:true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],

})
export class UpdategrpComponent implements OnInit {
  groupe: Groupe = new Groupe();
  GroupID: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupeservice: GroupeService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.GroupID = params.get('GroupID');
      this.groupeservice.getGroupeById(Number(this.GroupID)).subscribe(groupe => {
        this.groupe = groupe;
      });
    });
  }

  updateGroupe(): void {
    this.groupeservice.updateGroupe(this.GroupID, this.groupe).subscribe(updatedGroupe => {
      console.log('Groupe updated successfully:', updatedGroupe);
      this.router.navigate(['groupe-detail/', this.GroupID]);
    });
}
}*/