import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,   ReactiveFormsModule,  Validators } from '@angular/forms';
import { Groupe } from 'src/app/core/models/groupe';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { GroupeService } from 'src/app/core/services/groupe.service';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-ajouter',
  templateUrl: './ajoutergrp.component.html',
  styleUrls: ['./ajoutergrp.component.scss'],
  standalone : true,
  imports : [ReactiveFormsModule,DropdownModule,CheckboxModule  ]
})
export class AjouterComponent implements OnInit {
  groupForm: FormGroup;

  constructor(private fb: FormBuilder , private groupeService: GroupeService,
    private authservice: AuthService) {

    
    this.groupForm = this.fb.group({
      GroupName: [''],
      Description: [''],
  
    });
   }

   ngOnInit(): void {
    this.groupForm = this.fb.group({
      GroupName: ['', Validators.required],
      Description: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.groupForm.invalid) {
      return;
    }
   // Créer une nouvelle instance de l'objet User en extrayant les valeurs du formulaire
   const groupeData = this.groupForm.value;
   const groupe: Groupe = {
    GroupName: groupeData.GroupName,
    Description: groupeData.Description,
    GroupID: null,
    CreatedBy: Number(this.authservice.getUserID()),
    ModifiedOn: undefined,
     ModifiedBy: 1,
     created_at: null,
     updated_at:null
   };
    this.groupeService.addGroupe(groupe)
      .subscribe(
        response => {
          console.log('Groupe added successfully:', response);
          // Réinitialiser le formulaire après l'ajout réussi
          this.groupForm.reset();
        },
        error => {
          console.error('Groupe adding user:', error);
        }
      );
  }
}
