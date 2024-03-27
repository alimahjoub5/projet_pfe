import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { User } from 'src/app/core/models/User';
import { Groupe } from 'src/app/core/models/groupe';
import { Usertech } from 'src/app/core/models/user-tech';
import { GroupeService } from 'src/app/core/services/groupe.service';
import { UserService } from 'src/app/core/services/user-service.service';
import { UsersTechnicianGroupsService } from 'src/app/core/services/user-tech.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,DropdownModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit {
  
    usertech: Usertech;
    userstechForm: FormGroup;
    groups: Groupe[] | undefined;
  isLoading: boolean;

  constructor(private fb: FormBuilder, private usertechservice: UsersTechnicianGroupsService
    , private groupeservice:GroupeService,
    private userservice:UserService) {
    this.userstechForm = this.fb.group({
      UserID: ['', Validators.required],
      GroupID: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadGroupes();
    console.log(this.groups);
  }

  onSubmit(): void {
    if (this.userstechForm.invalid) {
      return;
    }
  
    const formData = this.userstechForm.value;
    const userstech: Usertech = {
      UserID: formData.UserID,
      GroupID: formData.GroupID,

    };
  
    this.usertechservice.assignUserToGroup(userstech.UserID, userstech.GroupID)
      .subscribe(
        response => {
          console.log('Userstech added successfully:', response);
          this.userstechForm.reset();
        },
        error => {
          console.error('Error adding userstech:', error);
        }
      );
  }
  loadGroupes(): void {
    this.isLoading = true;
    // Afficher le spinner avant de récupérer les données
    // this.spinner.show();
  
    this.groupeservice.getAllGroupes().subscribe(
      (groups: Groupe[]) => {
        this.groups = groups;
        this.isLoading = false;
        // Masquer le spinner après le chargement des données
        // this.spinner.hide();
      },
      error => {
        console.error('Erreur lors du chargement des groupes :', error);
        this.isLoading = false;
        // Assurez-vous de cacher le spinner en cas d'erreur
        // this.spinner.hide();
        // Afficher un message d'erreur
        // this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors du chargement des groupes.' });
      }
    );
  }
  

  loadUsers(): void {
    this.usertechservice.getUsersTechnicianGroups().subscribe(
      (usertechList: Usertech) => {
        this.usertech = usertechList;
      },
      (error: any) => {
        console.log('Error loading usertech: ', error);
      }
    );
    
  }
  
  


}
