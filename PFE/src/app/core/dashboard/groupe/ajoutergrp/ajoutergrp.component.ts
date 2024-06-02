import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,   ReactiveFormsModule,  Validators } from '@angular/forms';
import { Groupe } from 'src/app/core/models/groupe';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { GroupeService } from 'src/app/core/services/groupe.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajoutergrp.component.html',
  styleUrls: ['./ajoutergrp.component.scss'],
  standalone : true,
  imports : [ReactiveFormsModule,DropdownModule,CheckboxModule,ToastModule  ]
})
export class AjouterComponent implements OnInit {
  groupForm: FormGroup;

  constructor(private fb: FormBuilder , 
    private groupeService: GroupeService,
    private authservice: AuthService,
    private messageService :MessageService,
    private router: Router
  
  ) {

    
    this.groupForm = this.fb.group({
      GroupName: [''],
      Description: [''],
  
    });
   }
   onCancel(): void {
    // Réinitialiser le formulaire
    this.groupForm.reset();

    this.router.navigate(['/userlist']);
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
          this.messageService.add({severity:'success', summary:'success', detail:'groupe a été ajouté avec succès'});
          this.groupForm.reset();
        },
        error => {
          console.error('Groupe adding user:', error);
          this.messageService.add({severity:'error', summary:'Erreur', detail:error.error.message});

        }
      );
  }
}
