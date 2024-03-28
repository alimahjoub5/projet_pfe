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
  
  userstech: Usertech | any;
    userstechForm: FormGroup;
  isLoading: boolean;

  constructor(private fb: FormBuilder, private usertechservice: UsersTechnicianGroupsService) {
    this.userstechForm = this.fb.group({
      UserID: ['', Validators.required],
      GroupID: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTech();
    console.log(this.userstech);
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
 
  
  loadTech(): void {
    this.isLoading = true;
    // this.spinner.show(); // Afficher le spinner avant de récupérer les données
  
    this.usertechservice.getUsersTechnicianGroups().subscribe(
      (usertech: Usertech) => {
        this.userstech = usertech;
        this.isLoading = false;
        // this.spinner.hide(); // Masquer le spinner après le chargement des données
      },
      error => {
        console.error('Erreur lors du chargement des priorités :', error);
        this.isLoading = false;
        // this.spinner.hide(); // Assurez-vous de cacher le spinner en cas d'erreur
      }
    );
  }
  
  
  
  


}
