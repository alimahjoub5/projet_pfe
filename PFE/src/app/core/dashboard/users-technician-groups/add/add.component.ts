import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { User } from 'src/app/core/models/User';
import { Groupe } from 'src/app/core/models/groupe';
import { GroupeService } from 'src/app/core/services/groupe.service';
import { UserService } from 'src/app/core/services/user-service.service';
import { UsersTechnicianGroupsService } from 'src/app/core/services/user-tech.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    FileUploadModule,
    RouterModule,ToastModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit {

  groupes: Groupe[];
  selectedGroupe: number | undefined;
  users: User[] = [];
  selectedUser: number | undefined;

  constructor(private groupeService: GroupeService, private userService: UserService,private usertech:UsersTechnicianGroupsService
    ,private fb: FormBuilder, 
    private router: Router,
    private messageService :MessageService,

  ) { }

  ngOnInit(): void {
    this.getAllGroupes();
    this.getAllUsers();
  }

  getAllGroupes(): void {
    this.groupeService.getAllGroupes().subscribe(groupes => {
      this.groupes = groupes;
    });
  }

  getAllUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
  onCancel(): void {
    // Réinitialiser le formulaire

    this.router.navigate(['/listt']);
}
  assignUserToGroup(): void {
    if (this.selectedGroupe && this.selectedUser) {
      this.usertech.assignUserToGroup(this.selectedUser, this.selectedGroupe).subscribe(
        response => {
          console.log('Assignation réussie');
          // Réinitialiser les sélections après l'assignation réussie si nécessaire
          this.selectedGroupe = undefined;
          this.selectedUser = undefined;
          this.messageService.add({severity:'success', summary:'success', detail:"l'utilisateur a éte ajouté au groupe avec succés"});

        },
        error => {
          console.error('Erreur lors de l\'assignation :', error);
          this.messageService.add({severity:'error', summary:'Erreur', detail:error.error.message});

        }
      );
    }
  }

}